const express = require('express')

//configuration

require('dotenv').config()
const PORT = process.env.PORT
// console.log(PORT)
const app = express()

//routes

app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!!')
})

//breads
const breadsController = require('./controllers/breads_controllers.js')
app.use('/breads', breadsController)

//listen
app.listen(PORT, ()=>{
    console.log('listening on port', PORT)
})


