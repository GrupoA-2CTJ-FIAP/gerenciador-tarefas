const db = require('../models/firebase')

<<<<<<< HEAD
// Função para criar um novo team
const createTeam = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).send(error)
  }

  try {
    const newTeam = await db.collection('equipes').add({
      name
    })
    res.status(201).send({ id: newTeam.id })
  } catch (error) {
    res.status(500).send('Error creating team')
  }
}

// Função para listar todos os team com seus membros
const getTeam = async (req, res) => {
  try {
    const teamSnapshot = await db.collection('equipes').get()
    const team = await Promise.all(
      teamSnapshot.docs.map(async doc => {
        const teamData = doc.data()
        const membersSnapshot = await db
          .collection('usuarios')
          .where('teamId', '==', doc.id)
          .get()
        const membersteam = membersSnapshot.docs.map(memberDoc => ({
          id: memberDoc.id,
          ...memberDoc.data()
        }))
        return {
          id: doc.id,
          ...teamData,
          membersteam
        }
      })
    )
    res.status(200).send(team)
  } catch (error) {
    console.error('Error fetching team:', error)
    res.status(500).json({ message: 'Error fetching team' })
  }
}

// Função para atualizar um team existente
const updateTeam = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).send(error)
  }

  try {
    const teamRef = db.collection('equipes').doc(id)
    await teamRef.update({ name })
    res.status(200).send('Team updated successfully')
  } catch (error) {
    console.error('Error updating team:', error)
    res.status(500).send('Error updating team')
  }
}

// Função para deletar um team
const deleteTeam = async (req, res) => {
  const { id } = req.params

  try {
    await db.collection('equipes').doc(id).delete()
    res.status(200).send('Team deleted successfully')
  } catch (error) {
    res.status(500).send('Error deleting team')
=======
// Função para criar um novo membro da equipe com role
const createTeamMember = async (req, res) => {
  const { name, email, roleId } = req.body
  if (!name || !email || !roleId) {
    return res.status(400).send('All fields are required')
  }

  try {
    // Verificar se o role com o ID fornecido existe na coleção 'equipes'
    const roleDoc = await db.collection('equipes').doc(roleId).get()
    if (!roleDoc.exists) {
      return res.status(400).send('Role ID does not exist')
    }

    const newMember = await db.collection('usuarios').add({
      name,
      email,
      roleId, // Associar o membro com o ID do role
      totalHours: 0 // Inicialmente 0 horas alocadas
    })

    res.status(201).send({ id: newMember.id })
  } catch (error) {
    console.error('Error creating team member:', error) // Adiciona log de erro para debug
    res.status(500).send('Error creating team member')
  }
}

// Função para listar todos os membros da equipe
const getTeamMembers = async (req, res) => {
  try {
    const membersSnapshot = await db.collection('usuarios').get()
    const members = membersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }))
    res.status(200).send(members)
  } catch (error) {
    res.status(500).send('Error fetching team members')
  }
}

// Função para atualizar as informações de um membro da equipe
const updateTeamMember = async (req, res) => {
  const { id } = req.params
  const { name, email, role } = req.body

  if (!name || !email || !role) {
    return res.status(400).send('All fields are required')
  }

  try {
    const memberRef = db.collection('usuarios').doc(id)
    const memberDoc = await memberRef.get()

    if (!memberDoc.exists) {
      return res.status(404).send('Team member not found')
    }

    // Verificar se o e-mail está sendo alterado e se o novo e-mail já existe
    if (memberDoc.data().email !== email) {
      const emailSnapshot = await db
        .collection('usuarios')
        .where('email', '==', email)
        .get()
      if (!emailSnapshot.empty) {
        return res.status(400).send('Email already in use')
      }
    }

    await memberRef.update({
      name,
      email,
      role
    })
    res.status(200).send('Team member updated successfully')
  } catch (error) {
    res.status(500).send('Error updating team member')
  }
}

// Função para deletar um membro da equipe
const deleteTeamMember = async (req, res) => {
  const { id } = req.params

  try {
    const memberRef = db.collection('usuarios').doc(id)
    const memberDoc = await memberRef.get()

    if (!memberDoc.exists) {
      return res.status(404).send('Team member not found')
    }

    await memberRef.delete()
    res.status(200).send('Team member deleted successfully')
  } catch (error) {
    res.status(500).send('Error deleting team member')
>>>>>>> develop
  }
}

module.exports = {
<<<<<<< HEAD
  createTeam,
  getTeam,
  updateTeam,
  deleteTeam
=======
  createTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember
>>>>>>> develop
}
