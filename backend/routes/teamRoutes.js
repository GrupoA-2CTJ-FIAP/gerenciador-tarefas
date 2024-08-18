const express = require('express')
const teamController = require('../controllers/teamController')
const router = express.Router()

router.post('/members', teamController.createTeamMember)
router.get('/members', teamController.getTeamMembers)
router.put('/members/:id', teamController.updateTeamMember)
router.delete('/members/:id', teamController.deleteTeamMember)

module.exports = router
