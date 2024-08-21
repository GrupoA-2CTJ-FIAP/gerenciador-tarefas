const db = require('../models/firebase')

// Definir opções permitidas para a prioridade e status
const PRIORITY_OPTIONS = ['Baixa', 'Média', 'Alta', 'Urgente']
const STATUS_OPTIONS = ['To-do', 'Em progresso', 'Concluído']

// Função para validar a prioridade
const validatePriority = priority => PRIORITY_OPTIONS.includes(priority)

// Função para validar o status
const validateStatus = status => STATUS_OPTIONS.includes(status)

// Função para obter todos os membros
const getMembers = async () => {
  const membersSnapshot = await db.collection('usuarios').get()
  return membersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
}

// Função para validar o ID do membro atribuído
const validateAssignedTo = async memberId => {
  const members = await getMembers()
  return members.some(member => member.id === memberId)
}

// Função para recalcular o total de horas de um membro
const updateTotalHoursForMember = async memberId => {
  const tasksSnapshot = await db
    .collection('atividades')
    .where('assignedTo', '==', memberId)
    .get()
  const totalHours = tasksSnapshot.docs.reduce(
    (sum, doc) => sum + doc.data().duration,
    0
  )

  await db.collection('usuarios').doc(memberId).update({ totalHours })
}

// Criar tarefa e atualizar as horas alocadas
const createTask = async (req, res) => {
  const { description, endDate, priority, status, assignedTo, duration } =
    req.body

  if (
    !description ||
    !endDate ||
    !priority ||
    !status ||
    !assignedTo ||
    !duration
  ) {
    return res.status(400).send('All fields are required')
  }

  if (!validatePriority(priority)) {
    return res.status(400).send('Invalid priority')
  }

  if (!validateStatus(status)) {
    return res.status(400).send('Invalid status')
  }

  if (!(await validateAssignedTo(assignedTo))) {
    return res.status(400).send('Invalid assignedTo member ID')
  }

  try {
    const endTimestamp = new Date(endDate)

    const newTask = await db.collection('atividades').add({
      description,
      endDate: endTimestamp,
      priority,
      status,
      assignedTo,
      duration: parseFloat(duration) // Duração fornecida pelo usuário
    })

    await updateTotalHoursForMember(assignedTo)

    res.status(201).send({ id: newTask.id })
  } catch (error) {
    console.error('Error creating task:', error)
    res.status(500).send('Error creating task')
  }
}

// Buscar todas as tarefas com dados do membro atribuído
const getTasks = async (req, res) => {
  try {
    const tasksSnapshot = await db.collection('atividades').get()
    const tasks = await Promise.all(
      tasksSnapshot.docs.map(async doc => {
        const taskData = doc.data()
        let memberData = null

        if (taskData.assignedTo) {
          try {
            const memberSnapshot = await db
              .collection('usuarios')
              .doc(taskData.assignedTo)
              .get()
            memberData = memberSnapshot.exists ? memberSnapshot.data() : null
          } catch (memberError) {
            console.error('Error fetching member data:', memberError)
            memberData = null
          }
        }

        return {
          id: doc.id,
          ...taskData,
          assignedToMember: memberData
        }
      })
    )
    res.status(200).json(tasks)
  } catch (error) {
    console.error('Error fetching tasks:', error)
    res.status(500).json({ error: 'Failed to get tasks' })
  }
}

// Atualizar tarefa e as horas alocadas, se necessário
const updateTask = async (req, res) => {
  const { id } = req.params
  const { description, endDate, priority, status, assignedTo, duration } =
    req.body

  if (
    !description ||
    !endDate ||
    !priority ||
    !status ||
    !assignedTo ||
    !duration
  ) {
    return res.status(400).send('All fields are required')
  }

  if (!validatePriority(priority)) {
    return res.status(400).send('Invalid priority')
  }

  if (!validateStatus(status)) {
    return res.status(400).send('Invalid status')
  }

  if (!(await validateAssignedTo(assignedTo))) {
    return res.status(400).send('Invalid assignedTo member ID')
  }

  try {
    const endTimestamp = new Date(endDate)

    const taskRef = db.collection('atividades').doc(id)
    const task = await taskRef.get()

    if (!task.exists) {
      return res.status(404).send('Task not found')
    }

    const previousAssignedTo = task.data().assignedTo

    await taskRef.update({
      description,
      endDate: endTimestamp,
      priority,
      status,
      assignedTo,
      duration: parseFloat(duration) // Duração fornecida pelo usuário
    })

    if (assignedTo !== previousAssignedTo) {
      await updateTotalHoursForMember(previousAssignedTo)
    }
    await updateTotalHoursForMember(assignedTo)

    res.status(200).send('Task updated successfully')
  } catch (error) {
    res.status(500).send('Error updating task')
  }
}

// Deletar tarefa e atualizar as horas alocadas
const deleteTask = async (req, res) => {
  const { id } = req.params

  try {
    const taskRef = db.collection('atividades').doc(id)
    const taskSnapshot = await taskRef.get()

    if (!taskSnapshot.exists) {
      return res.status(404).send('Task not found')
    }

    const taskData = taskSnapshot.data()
    const assignedTo = taskData.assignedTo

    await taskRef.delete()

    if (assignedTo) {
      await updateTotalHoursForMember(assignedTo)
    }

    res.status(200).send('Task deleted successfully')
  } catch (error) {
    console.error('Error deleting task:', error)
    res.status(500).send('Error deleting task')
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
}
