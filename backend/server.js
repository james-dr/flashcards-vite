const express = require('express')
const cors = require('cors')
const helmet = require('helmet')
require('dotenv').config()

const cardsRoutes = require('./src/routes/cards')
const decksRoutes = require('./src/routes/decks')

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`)
  next()
})

app.get('/api/health', (req, res) => {
  res.json({ message: 'Server is running!' })
})

app.use('/api/cards', cardsRoutes)
app.use('/api/decks', decksRoutes)

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ message: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
