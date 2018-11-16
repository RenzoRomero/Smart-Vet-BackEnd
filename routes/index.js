'use strict'

const express = require('express')
const vetCtrl = require('../controllers/vet')
const ownerCtrl = require('../controllers/owner')
const petCtrl = require('../controllers/pet')
const productCtrl = require('../controllers/product')
const clinicHistoryCtrl = require('../controllers/clinicHistory')
const serviceCtrl = require('../controllers/service')
const promotionCtrl = require('../controllers/promotion')
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
api.put('/owner/:ownerId', ownerCtrl.updateOwner)
api.delete('/owner/:ownerId', ownerCtrl.deleteOwner)

api.get('/pet', petCtrl.getPets)
api.get('/pet/:petId', petCtrl.getPet)
api.get('/pet/owner/:ownerId', petCtrl.getPetsByOwner)
api.post('/pet', petCtrl.savePet)
api.put('/pet/:petId', petCtrl.updatePet)
api.delete('/pet/:petId', petCtrl.deletePet)

api.get('/product', productCtrl.getProducts)
api.get('/product/:productId', productCtrl.getProduct)
api.post('/product', auth, productCtrl.saveProduct)
api.delete('/product/:productId', auth, productCtrl.deleteProduct)
api.put('/product/:productId', auth, productCtrl.updateProduct)

api.get('/service', serviceCtrl.getServices)
api.get('/service/:serviceId', serviceCtrl.getService)
api.post('/service', auth, serviceCtrl.saveService)
api.delete('/service/:serviceId', auth, serviceCtrl.deleteService)
api.put('/service/:serviceId', auth, serviceCtrl.updateService)

api.get('/promotion', promotionCtrl.getPromotions)
api.get('/promotion/:promotionId', promotionCtrl.getPromotion)
api.post('/promotion', auth, promotionCtrl.savePromotion)
api.delete('/promotion/:promotionId', auth, promotionCtrl.deletePromotion)
api.put('/promotion/:promotionId', auth, promotionCtrl.updatePromotion)

api.get('/clinicHistory', clinicHistoryCtrl.getClinicalHistories)
api.get('/clinicHistory/:clinicHistoryId', clinicHistoryCtrl.getClinicHistory)
api.get('/clinicHistory/pet/:petId', clinicHistoryCtrl.getClinicalHistoriesByPet)
api.post('/clinicHistory', auth, clinicHistoryCtrl.saveClinicHistory)
api.delete('/clinicHistory/:clinicHistoryId', auth, clinicHistoryCtrl.deleteClinicHistory)
api.put('/clinicHistory/:clinicHistoryId', auth, clinicHistoryCtrl.updateClinicHistory)

api.get('/private', auth, (req, res) => {
  res.status(200).send({ message: `Tienes acceso`})
})

module.exports = api
