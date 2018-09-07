'use strict'

const express = require('express')
const petCtrl = require('../controllers/pet')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()

api.get('/pet', petCtrl.getPets)
api.get('/pet/:petId', petCtrl.getPet)
api.post('/pet', petCtrl.savePet)
api.put('/pet/:petId', petCtrl.updatePet)
api.delete('/pet/:petId', petCtrl.deletePet)

api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: `Tienes acceso`})
})

module.exports = api
