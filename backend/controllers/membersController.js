const db = require('../models/firebase')
const admin = require('firebase-admin')

// Função para criar um novo membro da equipe com team
/*const createTeamMember = async (req, res) => {
  const { name, email, teamId } = req.body
  if (!name || !email || !teamId) {
    return res.status(400).send('All fields are required')
  }

  try {
    // Verificar se o team com o ID fornecido existe na coleção 'equipes'
    const teamDoc = await db.collection('equipes').doc(teamId).get()
    if (!teamDoc.exists) {
      return res.status(400).send('Team ID does not exist')
    }

    const newMember = await db.collection('usuarios').add({
      name,
      email,
      teamId, // Associar o membro com o ID do team
      totalHours: 0 // Inicialmente 0 horas alocadas
    })

    res.status(201).send({ id: newMember.id })
  } catch (error) {
    console.error('Error creating team member:', error) // Adiciona log de erro para debug
    res.status(500).send('Error creating team member')
  }
}*/

// Função para criar um novo membro da equipe com team
const createTeamMember = async (req, res) => {
  const { name, email, teamId, password } = req.body
  if (!name || !email || !teamId || !password) {
    return res.status(400).send('All fields are required')
  }

  try {
    // Verificar se o team com o ID fornecido existe na coleção 'equipes'
    const teamDoc = await db.collection('equipes').doc(teamId).get()
    if (!teamDoc.exists) {
      return res.status(400).send('Team ID does not exist')
    }

    // Criar usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name
    })

    // Adicionar o usuário na coleção 'usuarios' do Firestore
    const newMember = await db.collection('usuarios').add({
      name,
      email,
      teamId, // Associar o membro com o ID do team
      totalHours: 0, // Inicialmente 0 horas alocadas
      uid: userRecord.uid // Vincular o UID do Firebase Authentication
    })

    res.status(201).send({ id: newMember.id })
  } catch (error) {
    console.error('Error creating team member:', error)
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
  const { name, email, teamId } = req.body

  if (!name || !email || !teamId) {
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
      teamId
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
  }
}

module.exports = {
  createTeamMember,
  getTeamMembers,
  updateTeamMember,
  deleteTeamMember
}
