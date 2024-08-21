const db = require('../models/firebase')

<<<<<<< HEAD
// Definir opções permitidas para a prioridade e status
const PRIORITY_OPTIONS = ['Baixa', 'Média', 'Alta', 'Urgente']
const STATUS_OPTIONS = ['To-do', 'Em progresso', 'Concluído']

// Função para validar a prioridade
const validatePriority = priority => PRIORITY_OPTIONS.includes(priority)

// Função para validar o status
const validateStatus = status => STATUS_OPTIONS.includes(status)
=======
// Definir opções permitidas para a prioridade
const PRIORITY_OPTIONS = ['Baixa', 'Média', 'Alta', 'Urgente']

// Função para validar a prioridade
const validatePriority = priority => {
  return PRIORITY_OPTIONS.includes(priority)
}
>>>>>>> develop

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
<<<<<<< HEAD
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
=======
  const { description, startDate, endDate, priority, assignedTo } = req.body

  if (!description || !startDate || !endDate || !priority || !assignedTo) {
>>>>>>> develop
    return res.status(400).send('All fields are required')
  }

  if (!validatePriority(priority)) {
    return res.status(400).send('Invalid priority')
  }

<<<<<<< HEAD
  if (!validateStatus(status)) {
    return res.status(400).send('Invalid status')
  }

=======
>>>>>>> develop
  if (!(await validateAssignedTo(assignedTo))) {
    return res.status(400).send('Invalid assignedTo member ID')
  }

  try {
<<<<<<< HEAD
    const endTimestamp = new Date(endDate)

    const newTask = await db.collection('atividades').add({
      description,
      endDate: endTimestamp,
      priority,
      status,
      assignedTo,
      duration: parseFloat(duration) // Duração fornecida pelo usuário
=======
    const startTimestamp = new Date(startDate)
    const endTimestamp = new Date(endDate)

    if (endTimestamp <= startTimestamp) {
      return res.status(400).send('End date must be after start date')
    }

    const duration = (endTimestamp - startTimestamp) / (1000 * 60 * 60) // Duração em horas

    const newTask = await db.collection('atividades').add({
      description,
      startDate: startTimestamp,
      endDate: endTimestamp,
      priority,
      assignedTo,
      duration
>>>>>>> develop
    })

    await updateTotalHoursForMember(assignedTo)

    res.status(201).send({ id: newTask.id })
  } catch (error) {
<<<<<<< HEAD
    console.error('Error creating task:', error)
=======
>>>>>>> develop
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

<<<<<<< HEAD
=======
        // Verifica se assignedTo é um valor válido
>>>>>>> develop
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
<<<<<<< HEAD
    console.error('Error fetching tasks:', error)
=======
    console.error('Error fetching tasks:', error) // Adiciona log de erro para depuração
>>>>>>> develop
    res.status(500).json({ error: 'Failed to get tasks' })
  }
}

// Atualizar tarefa e as horas alocadas, se necessário
const updateTask = async (req, res) => {
  const { id } = req.params
<<<<<<< HEAD
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
=======
  const { description, startDate, endDate, priority, assignedTo } = req.body

  if (!description || !startDate || !endDate || !priority || !assignedTo) {
>>>>>>> develop
    return res.status(400).send('All fields are required')
  }

  if (!validatePriority(priority)) {
    return res.status(400).send('Invalid priority')
  }

<<<<<<< HEAD
  if (!validateStatus(status)) {
    return res.status(400).send('Invalid status')
  }

=======
>>>>>>> develop
  if (!(await validateAssignedTo(assignedTo))) {
    return res.status(400).send('Invalid assignedTo member ID')
  }

  try {
<<<<<<< HEAD
    const endTimestamp = new Date(endDate)

=======
    const startTimestamp = new Date(startDate)
    const endTimestamp = new Date(endDate)

    if (endTimestamp <= startTimestamp) {
      return res.status(400).send('End date must be after start date')
    }

    const duration = (endTimestamp - startTimestamp) / (1000 * 60 * 60) // Duração em horas

>>>>>>> develop
    const taskRef = db.collection('atividades').doc(id)
    const task = await taskRef.get()

    if (!task.exists) {
      return res.status(404).send('Task not found')
    }

    const previousAssignedTo = task.data().assignedTo

    await taskRef.update({
      description,
<<<<<<< HEAD
      endDate: endTimestamp,
      priority,
      status,
      assignedTo,
      duration: parseFloat(duration) // Duração fornecida pelo usuário
=======
      startDate: startTimestamp,
      endDate: endTimestamp,
      priority,
      assignedTo,
      duration
>>>>>>> develop
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

<<<<<<< HEAD
    await taskRef.delete()

=======
    // Delete the task
    await taskRef.delete()

    // Update total hours for the member
>>>>>>> develop
    if (assignedTo) {
      await updateTotalHoursForMember(assignedTo)
    }

    res.status(200).send('Task deleted successfully')
  } catch (error) {
<<<<<<< HEAD
    console.error('Error deleting task:', error)
=======
    console.error('Error deleting task:', error) // Log detailed error
>>>>>>> develop
    res.status(500).send('Error deleting task')
  }
}

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
}
