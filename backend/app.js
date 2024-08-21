const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
<<<<<<< HEAD
const membersRoutes = require('./routes/membersRoutes')
const taskRoutes = require('./routes/taskRoutes')
const teamRoutes = require('./routes/teamRoutes')
=======
const teamRoutes = require('./routes/teamRoutes')
const taskRoutes = require('./routes/taskRoutes')
const roleRoutes = require('./routes/roleRoutes')
>>>>>>> develop

const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())

<<<<<<< HEAD
app.use('/api', membersRoutes)
app.use('/api', taskRoutes)
app.use('/api', teamRoutes)
=======
app.use('/api', teamRoutes)
app.use('/api', taskRoutes)
app.use('/api', roleRoutes)
>>>>>>> develop

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
