require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const characterRoutes = require('./routes/characters')
const userRoutes = require('./routes/user')
const cors = require('cors');

const app = express ()

//middleware
app.use(cors())
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

app.use('/api/characters', characterRoutes)
app.use('/api/user', userRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Connected to database and listening on port 4000')
        })
    })
    .catch((error) => {
        console.log(error)
    })

process.env