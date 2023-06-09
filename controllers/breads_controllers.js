//DEPENDENCIES

const express = require('express')
const breads = express.Router()
const Bread = require('../models/bread.js')
const seed = require('../models/seed.js')
const Baker = require('../models/baker.js')


//INDEX
breads.get('/', async (req,res) => {
 const foundBakers = await Baker.find().lean()
 const foundBreads = await Bread.find().lean()
 
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })


})

//NEW
breads.get('/new' , (req, res)=> {
    Baker.find()
      .then(foundBakers => {
        res.render('new',{
          bakers:foundBakers
        })
      })
})






//SHOW
breads.get('/:id', (req, res)=>{
  Bread.findById(req.params.id)
    .populate('baker')
    .then(foundBread => {
      const bakedBy = foundBread.getBakedBy()
      res.render('show', {
        bread: foundBread,
      })
    })

    .catch(err => {
      res.send('404')
    })
})

//EDIT
breads.get('/:id/edit',(req,res)=>{
  Baker.find()
    .then(foundBakers=>{
      Bread.findById(req.params.id)
      .then(foundBread =>{
        res.render('edit',{
          bread: foundBread,
          bakers: foundBakers
        })
      })
    })
})

//UPDATE
breads.put('/:id' , (req,res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else{
    req.body.hasGluten = false
  }

  Bread.findByIdAndUpdate(req.params.id, req.body, {new:true})
  .then(updatedBread => {
    res.redirect(`/breads/${req.params.id}`)
  })
  
})

// CREATE
breads.post('/', async (req, res) => {
    if (!req.body.image) {
      req.body.image = undefined
    }
    if(req.body.hasGluten === 'on') {
      req.body.hasGluten = true
    } else {
      req.body.hasGluten = false
    }
    try { await Bread.create(req.body) } catch(error) {console.log("there was an error: Duplicate bread found")}
    res.redirect('/breads')



  })
  
  //DELETE
  breads.delete('/:id',(req,res)=> {
    Bread.findByIdAndDelete(req.params.id)
      .then(deleteBread =>{
        res.status(303).redirect('/breads')
      })
      
  })

  //SEED DATA, only to be used once to create default data.
  breads.get('/data/seed' , (req,res) => {
    Bread.insertMany(seed)
      .then(createdBreads => {
        res.redirect('/breads')
      })
  })

module.exports = breads