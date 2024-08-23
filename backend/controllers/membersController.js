const db = require('../models/firebase')
const admin = require('firebase-admin')

// Função para criar um novo membro da equipe com team
const createTeamMember = async (req, res) => {
  const { name, email, teamId, password } = req.body
  if (!name || !email || !teamId || !password) {
    console.error('All fields are required')
    return res.sendStatus(400)
  }

  try {
    // Verificar se o team com o ID fornecido existe na coleção 'equipes'
    const teamDoc = await db.collection('equipes').doc(teamId).get()
    if (!teamDoc.exists) {
      console.error('Team ID does not exist')
      return res.sendStatus(400)
    }

    // Criar usuário no Firebase Authentication
    const userRecord = await admin.auth().createUser({
      email: email,
      password: password,
      displayName: name
    })

    // Adicionar o usuário na coleção 'usuarios' do Firestore usando o UID como ID do documento
    await db.collection('usuarios').doc(userRecord.uid).set({
      name,
      email,
      teamId, // Associar o membro com o ID do team
      totalHours: 0 // Inicialmente 0 horas alocadas
    })

    res.status(201).send({ id: userRecord.uid })
  } catch (error) {
    console.error('Error creating team member:', error)
    return res.sendStatus(500)
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
    console.error('Error fetching team members:', error)
    res.sendStatus(500)
  }
}

// Função para obter um membro da equipe pelo ID (UID)
const getTeamMemberById = async (req, res) => {
  const { id } = req.params

  try {
    const memberDoc = await db.collection('usuarios').doc(id).get()

    if (!memberDoc.exists) {
      console.error('Member not found')
      return res.sendStatus(404)
    }

    const member = {
      id: memberDoc.id,
      ...memberDoc.data()
    }

    res.status(200).send(member)
  } catch (error) {
    console.error('Error fetching team member by ID:', error)
    res.sendStatus(500)
  }
}

// Função para atualizar as informações de um membro da equipe
const updateTeamMember = async (req, res) => {
  const { id } = req.params
  const { name, email, teamId } = req.body

  if (!name || !email || !teamId) {
    console.error('All fields are required')
    return res.sendStatus(400)
  }

  try {
    const memberRef = db.collection('usuarios').doc(id)
    const memberDoc = await memberRef.get()

    if (!memberDoc.exists) {
      console.error('Team member not found')
      return res.sendStatus(404)
    }

    // Verificar se o e-mail está sendo alterado e se o novo e-mail já existe
    if (memberDoc.data().email !== email) {
      const emailSnapshot = await db
        .collection('usuarios')
        .where('email', '==', email)
        .get()
      if (!emailSnapshot.empty) {
        console.error('Email already in use')
        return res.sendStatus(400)
      }
    }

    await memberRef.update({
      name,
      email,
      teamId
    })
    res.status(200).send('Team member updated successfully')
  } catch (error) {
    console.error('Error updating team member', error)
    res.sendStatus(500)
  }
}

// Função para deletar um membro da equipe
const deleteTeamMember = async (req, res) => {
  const { id } = req.params

  try {
    const memberRef = db.collection('usuarios').doc(id)
    const memberDoc = await memberRef.get()

    if (!memberDoc.exists) {
      console.error('Team member not found')
      return res.sendStatus(404)
    }

    await memberRef.delete()
    res.status(200).send('Team member deleted successfully')
  } catch (error) {
    console.error('Error deleting team member', error)
    res.sendStatus(500)
  }
}

module.exports = {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  updateTeamMember,
  deleteTeamMember
}
