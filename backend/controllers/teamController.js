const db = require('../models/firebase')

// Função para criar um novo team
const createTeam = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.sendStatus(400)
  }

  try {
    const newTeam = await db.collection('equipes').add({ name })
    res.status(201).send({ id: newTeam.id })
  } catch (error) {
    console.error('Error creating team:', error)
    res.sendStatus(500)
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
    res.sendStatus(500)
  }
}

// Função para obter uma equipe específica pelo ID com seus membros
const getTeamById = async (req, res) => {
  const { id } = req.params

  try {
    const teamDoc = await db.collection('equipes').doc(id).get()

    if (!teamDoc.exists) {
      return res.sendStatus(404)
    }

    const teamData = teamDoc.data()
    const membersSnapshot = await db
      .collection('usuarios')
      .where('teamId', '==', id)
      .get()

    const membersteam = membersSnapshot.docs.map(memberDoc => ({
      id: memberDoc.id,
      ...memberDoc.data()
    }))

    const team = {
      id: teamDoc.id,
      ...teamData,
      membersteam
    }

    res.status(200).send(team)
  } catch (error) {
    console.error('Error fetching team by ID:', error)
    res.sendStatus(500)
  }
}

// Função para atualizar um team existente
const updateTeam = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.sendStatus(400)
  }

  try {
    const teamRef = db.collection('equipes').doc(id)
    await teamRef.update({ name })
    res.sendStatus(200)
  } catch (error) {
    console.error('Error updating team:', error)
    res.sendStatus(500)
  }
}

// Função para deletar um team
const deleteTeam = async (req, res) => {
  const { id } = req.params

  try {
    await db.collection('equipes').doc(id).delete()
    res.sendStatus(200)
  } catch (error) {
    console.error('Error deleting team:', error)
    res.sendStatus(500)
  }
}

module.exports = {
  createTeam,
  getTeam,
  getTeamById,
  updateTeam,
  deleteTeam
}
