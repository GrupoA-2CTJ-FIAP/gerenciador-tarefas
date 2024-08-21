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

  }
}

module.exports = {

  createTeam,
  getTeam,
  updateTeam,
  deleteTeam

}
