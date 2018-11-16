'use strict'

const ClinicHistory = require('../models/clinicHistory')

function getClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId

  ClinicHistory.findById(clinicHistoryId, (err, clinicHistory) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!clinicHistory) return res.status(404).send({message: `Error la história clínica no existe`})

    res.status(200).send({ clinicHistory })

    Pet.populate(pet, {path: "pet"}, function(err, clinicHistory){
      Owner.populate(pet, {path: "pet.owner"}, function(err, clinicHistory){
        res.status(200).send({ clinicHistory })
      });
    });
  })
}

function getClinicalHistories (req, res) {
  ClinicHistory.find({}, (err, clinicalHistories) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!clinicalHistories) return res.status(404).send({message: `No existen productos`})

    Pet.populate(pet, {path: "pet"}, function(err, clinicalHistories){
      Owner.populate(pet, {path: "pet.owner"}, function(err, clinicalHistories){
        res.status(200).send({ clinicalHistories })
      });
    });
  })
}

function getClinicalHistoriesByPet (req, res) {
  let petId = req.params.petId

  ClinicHistory.find({"pet": petId}, (err, clinicalHistories) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!clinicalHistories) return res.status(404).send({message: `No existen productos`})

    Pet.populate(pet, {path: "pet"}, function(err, clinicalHistories){
      Owner.populate(pet, {path: "pet.owner"}, function(err, clinicalHistories){
        res.status(200).send({ clinicalHistories })
      });
    });
  })
}

function saveClinicHistory (req, res) {
  console.log('POST /api/clinicHistory')
  console.log(req.body)

  let clinicHistory = new ClinicHistory()
  clinicHistory.date = req.body.date
  clinicHistory.pet = req.body.pet
  clinicHistory.weight = req.body.weight
  clinicHistory.height = req.body.height
  clinicHistory.details = req.body.details

  clinicHistory.save((err, clinicHistoryStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({clinicHistory: clinicHistoryStored})
  })
}

function updateClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId
  let update = req.body

  ClinicHistory.findByIdAndUpdate(clinicHistoryId, update, (err, clinicHistoryUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la historia clínica ${err}`})

    res.status(200).send({ clinicHistory: clinicHistoryUpdated})
  })
}

function deleteClinicHistory (req, res) {
  let clinicHistoryId = req.params.clinicHistoryId

  ClinicHistory.findById(clinicHistoryId, (err, clinicHistory) => {
    if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})

    clinicHistory.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el producto ${err}`})
      res.status(200).send({message: `La historia clínica se ha sido eliminada`})
    })
  })
}

module.exports = {
  getClinicHistory,
  getClinicalHistories,
  getClinicalHistoriesByPet,
  saveClinicHistory,
  updateClinicHistory,
  deleteClinicHistory
}
