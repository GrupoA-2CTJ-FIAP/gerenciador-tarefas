const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teamController')

// Rota para criar um team
router.post('/team', teamController.createTeam)

// Rota para listar todos os team com membros
router.get('/team', teamController.getTeam)

// Rota para atualizar um team
router.put('/team/:id', teamController.updateTeam)

// Rota para deletar um team
router.delete('/team/:id', teamController.deleteTeam)

module.exports = router
