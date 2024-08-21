const express = require('express')
<<<<<<< HEAD
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
=======
const teamController = require('../controllers/teamController')
const router = express.Router()

router.post('/members', teamController.createTeamMember)
router.get('/members', teamController.getTeamMembers)
router.put('/members/:id', teamController.updateTeamMember)
router.delete('/members/:id', teamController.deleteTeamMember)
>>>>>>> develop

module.exports = router
