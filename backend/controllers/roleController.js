const db = require('../../models/firebase')

// Função para criar um novo role
const createRole = async (req, res) => {
  const { name } = req.body
  if (!name) {
    return res.status(400).send('Role name is required')
  }

  try {
    const newRole = await db.collection('equipes').add({
      name
    })
    res.status(201).send({ id: newRole.id })
  } catch (error) {
    res.status(500).send('Error creating role')
  }
}

// Função para listar todos os roles com seus membros
const getRoles = async (req, res) => {
  try {
    const rolesSnapshot = await db.collection('equipes').get()
    const roles = await Promise.all(
      rolesSnapshot.docs.map(async doc => {
        const roleData = doc.data()
        const membersSnapshot = await db
          .collection('usuarios')
          .where('roleId', '==', doc.id)
          .get()
        const members = membersSnapshot.docs.map(memberDoc => ({
          id: memberDoc.id,
          ...memberDoc.data()
        }))
        return {
          id: doc.id,
          ...roleData,
          members
        }
      })
    )
    res.status(200).send(roles)
  } catch (error) {
    res.status(500).send('Error fetching roles')
  }
}

// Função para atualizar um role existente
const updateRole = async (req, res) => {
  const { id } = req.params
  const { name } = req.body
  if (!name) {
    return res.status(400).send('Role name is required')
  }

  try {
    const roleRef = db.collection('equipes').doc(id)
    await roleRef.update({ name })
    res.status(200).send('Role updated successfully')
  } catch (error) {
    res.status(500).send('Error updating role')
  }
}

// Função para deletar um role
const deleteRole = async (req, res) => {
  const { id } = req.params

  try {
    await db.collection('equipes').doc(id).delete()
    res.status(200).send('Role deleted successfully')
  } catch (error) {
    res.status(500).send('Error deleting role')
  }
}

module.exports = {
  createRole,
  getRoles,
  updateRole,
  deleteRole
}
