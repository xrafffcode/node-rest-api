const express = require('express')
const app = express()
const monggoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
require('dotenv/config')

// Middleware
app.use(bodyParser.json())
app.use(cors())

// import routes
const pegawaiRoutes = require('./routes/pegawai')
const authRoutes = require('./routes/auth')

// routes
app.use('/api/pegawai', pegawaiRoutes)
app.use('/api/auth', authRoutes)

// connect to mongoDB
monggoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
let db = monggoose.connection

db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
    console.log('connected to mongoDB')
})

// listen
app.listen(process.env.PORT, () => {
    console.log('listening on port ' + process.env.PORT)
})