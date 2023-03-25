const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
//INDEX
breads.get('/', (req,res) => {
    res.render('index', 
    {
        breads: Bread,
        title:'Breads List',
    })
    // res.send(Bread)
})

//NEW
breads.get('/new' , (req, res)=> {
    res.render('new')
})






//SHOW
breads.get('/:indexArray', (req, res)=>{
    if(Bread[req.params.indexArray]){    
        res.render('Show', { 
            bread: Bread[req.params.indexArray],
            index: req.params.indexArray,
        })
    } else {
        res.render('404')
    }
})

//EDIT
breads.get('/:indexArray/edit',(req,res)=>{
  res.render('edit',{
    bread: Bread[req.params.indexArray],
    index:req.params.indexArray
  })
})

//UPDATE
breads.put('/:indexArray' , (req,res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else{
    req.body.hasGluten = false
  }
  Bread[req.params.indexArray] = req.body
  res.redirect(`/breads/${req.params.indexArray}`)
})

// CREATE
breads.post('/', (req, res) => {
    if (!req.body.image) {
      req.body.image = 'https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    Bread.push(req.body)
    res.redirect('/breads')
  })
  
  //DELETE
  breads.delete('/:indexArray',(req,res)=> {
    Bread.splice(req.params.indexArray, 1)
    res.status(303).redirect('/breads')
  })



module.exports = breads