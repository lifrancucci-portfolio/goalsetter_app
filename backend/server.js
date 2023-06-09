const path = require('path')
const express = require('express')
const color = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const PORT = process.env.PORT || 5000
const cors = require("cors");

connectDB()

const app = express()

// middleware
const corsOptions = {
  origin: "https://goalsetter-app-x1j2.onrender.com" // frontend URI (ReactJS)
}
app.use(express.json());
app.use(cors(corsOptions));

app.use(express.json())
app.use(express.urlencoded({ extended: 'false' }))

app.use('/api/goals', require('./routes/goalRoutes'))
app.use('/api/users', require('./routes/userRoutes'))

// Serve frontend
if(process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  })
}
else {
  app.get('/', (req, res) => res.send('Please set your Node environment to production'))
}

app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}; Press Ctrl-C to stop...`))