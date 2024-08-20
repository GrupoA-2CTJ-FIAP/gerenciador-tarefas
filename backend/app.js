const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const membersRoutes = require('./routes/membersRoutes')
const taskRoutes = require('./routes/taskRoutes')
const teamRoutes = require('./routes/teamRoutes')

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

app.use('/api', membersRoutes)
app.use('/api', taskRoutes)
app.use('/api', teamRoutes)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
