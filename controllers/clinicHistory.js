'use strict'

const ClinicHistory = require('../models/clinicHistory')

function getClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId

  ClinicHistory.findById(clinicHistoryId, (err, clinicHistory) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!clinicHistory) return res.status(404).send({message: `Error la história clínica no existe`})

    res.status(200).send({ clinicHistory })
  })
}

function getClinicalHistories (req, res) {
  ClinicHistory.find({}, (err, clinicalHistories) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!clinicalHistories) return res.status(404).send({message: `No existen productos`})

    res.status(200).send({ clinicalHistories })
  })
}

function saveClinicHistory (req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new ClinicHistory()
  product.brand = req.body.brand
  product.name = req.body.name
  product.photo = req.body.photo
  product.description = req.body.description
  product.price = req.body.price
  product.quantity = req.body.quantity

  product.save((err, productStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({product: productStored})
  })
}

function updateClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId
  let update = req.body

  ClinicHistory.findByIdAndUpdate(clinicHistoryId, update, (err, productUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el producto ${err}`})

    res.status(200).send({ product: productUpdated})
  })
}

function deleteClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId

  ClinicHistory.findById(clinicHistoryId, (err, product) => {
    if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

    product.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
      res.status(200).send({message: `El producto se ha sido eliminada`})
    })
  })
}

module.exports = {
  getClinicHistory,
  getClinicalHistories,
  saveClinicHistory,
  updateClinicHistory,
  deleteClinicHistory
}
