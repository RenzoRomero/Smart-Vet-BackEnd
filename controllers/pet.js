'use strict'

const Pet = require('../models/pet.js')

function getPet (req, res) {
  let petId = req.params.petId

  Pet.findById(petId, (err, pet) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!pet) return res.status(404).send({message: `La mascota no existe`})

    res.status(200).send({ pet })
  })
}

function getPets (req, res) {
  Pet.find({}, (err,pets) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!pets) return res.status(404).send({message: `No existen mascotas`})

    res.status(200).send({ pets })
  })
}

function savePet (req, res) {
  console.log('POST /api/pet')
  console.log(req.body)

  let pet = new Pet()
  pet.name = req.body.name
  pet.photo = req.body.photo
  pet.breed = req.body.breed
  pet.gender = req.body.gender
  pet.owner = req.body.owner

  pet.save((err, petStored) => {
    if (err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})

    res.status(200).send({pet: petStored})
  })
}

function updatePet (req, res) {
  let petId = req.params.petId
  let update = req.body

  Pet.findOneAndUpdate(petId, update, { new: true }, (err, petUpdated) => {
    if (err) return res.status(500).send({message: `Error al actualizar la mascota: ${err}`})

    res.status(200).send({ pet: petUpdated })
  })
}

function deletePet (req, res) {
  let petId = req.params.petId

  Pet.findById(petId, (err, pet) => {
    if (err) return res.status(500).send({message: `Error al borrar la mascota: ${err}`})

    pet.remove(err => {
      if (err) return res.status(500).send({message: `Error al borrar la mascota: ${err}`})

      res.status(200).send({message: `La mascota ha sido eliminada`})
    })
  })
}

module.exports = {
  getPet,
  getPets,
  savePet,
  updatePet,
  deletePet
}
