'use strict'

const Owner = require('../models/owner')
const Pet = require('../models/pet')

function getPet (req, res) {
  let petId = req.params.petId

  Pet.findById(petId, (err, pet) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!pet) return res.status(404).send({message: `La mascota no existe`})

    Owner.populate(pet, {path: "owner"}, function(err, pet){
      res.status(200).send({ pet })
    });
  })
}

function getPets (req, res) {
  Pet.find({"status": "A"}, (err,pets) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!pets) return res.status(404).send({message: `No existen mascotas`})

    Owner.populate(pets, {path: "owner"}, function(err, pets){
      res.status(200).send({ pets })
    });
  })
}

function getPetsByOwner (req, res) {
  let ownerId = req.params.ownerId
  Pet.find({"status": "A", "owner": ownerId}, (err,pets) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!pets) return res.status(404).send({message: `No existen mascotas`})

    Owner.populate(pets, {path: "owner"}, function(err, pets){
      res.status(200).send({ pets })
    });
  })
}

function savePet (req, res) {
  console.log('POST /api/pet')
  console.log(req.body)

  let pet = new Pet()
  pet.owner = req.body.owner
  pet.name = req.body.name
  pet.photo = req.body.photo
  pet.breed = req.body.breed
  pet.birthdate = req.body.birthdate
  pet.gender = req.body.gender

  pet.save((err, petStored) => {
    if (err) return res.status(500).send({message: `Error al guardar en la base de datos: ${err}`})

    Owner.populate(petStored, {path: "owner"}, function(err, petStored){
      res.status(200).send({ petStored })
    });
  })
}

function updatePet (req, res) {
  let petId = req.params.petId
  let update = req.body

  Pet.findOneAndUpdate(petId, update, { new: true }, (err, petUpdated) => {
    if (err) return res.status(500).send({message: `Error al actualizar la mascota: ${err}`})

    Owner.populate(petUpdated, {path: "owner"}, function(err, petUpdated){
      res.status(200).send({ petUpdated })
    });
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
