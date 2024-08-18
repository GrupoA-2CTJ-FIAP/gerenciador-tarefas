const express = require('express')
const router = express.Router()
const roleController = require('../controllers/roleController')

// Rota para criar um role
router.post('/roles', roleController.createRole)

// Rota para listar todos os roles com membros
router.get('/roles', roleController.getRoles)

// Rota para atualizar um role
router.put('/roles/:id', roleController.updateRole)

// Rota para deletar um role
router.delete('/roles/:id', roleController.deleteRole)

module.exports = router
