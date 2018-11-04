'use strict'

const express = require('express')
const vetCtrl = require('../controllers/vet')
const ownerCtrl = require('../controllers/owner')
const petCtrl = require('../controllers/pet')
const productCtrl = require('../controllers/product')
const auth = require('../middlewares/auth')
const api = express.Router()

api.post('/vet/signup', vetCtrl.signUp)
api.post('/vet/signin', vetCtrl.signIn)
api.get('/vet', vetCtrl.getVets)
api.put('/vet/:vetId', vetCtrl.updateVet)
api.delete('/vet/:vetId', vetCtrl.deleteVet)

api.post('/owner/signup', ownerCtrl.signUp)
api.post('/owner/signin', ownerCtrl.signIn)
api.get('/owner', ownerCtrl.getOwners)

api.get('/pet', petCtrl.getPets)
api.get('/pet/:petId', petCtrl.getPet)
api.post('/pet', petCtrl.savePet)
api.put('/pet/:petId', petCtrl.updatePet)
api.delete('/pet/:petId', petCtrl.deletePet)

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: `Tienes acceso`})
})

module.exports = api
