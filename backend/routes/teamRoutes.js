const express = require('express')
const router = express.Router()
const teamController = require('../controllers/teamController')

router.post('/team', teamController.createTeam)
router.get('/team', teamController.getTeam)
router.get('/team/:id', teamController.getTeamById)
router.put('/team/:id', teamController.updateTeam)
router.delete('/team/:id', teamController.deleteTeam)

module.exports = router
