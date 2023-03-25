const express = require('express')

//configuration

require('dotenv').config()
const PORT = process.env.PORT
// console.log(PORT)
const app = express()


//DEPENDENCIES
const methodOverride = require('method-override')
//MIDDLEWARE
app.use(methodOverride('_method'))
app.set('views',__dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))



//routes

app.get('/', (req, res) =>{
    res.send('Welcome to an Awesome App about Breads!!')
})



//breads
const breadsController = require('./controllers/breads_controllers.js')
app.use('/breads', breadsController)

//404 Page
app.get('*', (req, res) => {
    res.send('404')
})


//listen
app.listen(PORT, ()=>{
    console.log('listening on port', PORT)
})


