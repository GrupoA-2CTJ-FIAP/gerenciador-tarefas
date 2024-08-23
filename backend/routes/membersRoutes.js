const express = require('express')
const membersController = require('../controllers/membersController')
const router = express.Router()

router.post('/members', membersController.createTeamMember)
router.get('/members', membersController.getTeamMembers)
router.get('/members/:id', membersController.getTeamMemberById)
router.put('/members/:id', membersController.updateTeamMember)
router.delete('/members/:id', membersController.deleteTeamMember)

module.exports = router
