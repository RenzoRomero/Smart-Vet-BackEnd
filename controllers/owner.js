'use strict'

const mongoose = require('mongoose')
const Owner = require('../models/owner')
const service = require('../services')

function signUp (req, res) {
  const owner = new Owner({
    email: req.body.email,
    name: req.body.name,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    mobilePhone: req.body.mobilePhone,
    gender: req.body.gender
  })

  owner.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear propietario: ${err}` })

    return res.status(200).send({
      message: '200',
      token: service.createToken(owner)
    })
  })
}

function signIn (req, res) {
  Owner.findOne({ email: req.body.email }, (err, owner) => {
    if (err) return res.status(500).send({ message: err})
    if (!owner) return res.status(404).send({ message: `No existe el usuario` })

    return owner.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` })

      req.owner = owner
      return res.status(200).send({
        message: 'Te has logueado correctamente',
        owner: owner,
        token: service.createToken(owner)
      })
    })
  })
  }

function getOwner (req, res) {
  let ownerId = req.params.ownerId

  Owner.findById(ownerId, (err, owner) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!owner) return res.status(404).send({message: `La mascota no existe`})

    res.status(200).send({ owners })
  })
}

function getOwners (req, res) {
  Owner.find({"status": "A"}, (err,owners) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!owners) return res.status(404).send({message: `No existen mascotas`})

    res.status(200).send({ owners })
  })
}

function updateOwner (req, res) {
  let ownerId = req.params.ownerId
  let update = req.body

  Owner.findOneAndUpdate(ownerId, update, { new: true },(err, ownerUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar datos del propietario ${err}`})

    res.status(200).send({
      message: '200',
      owner: ownerUpdated})
  })
}

function deleteOwner (req, res) {
  let ownerId = req.params.ownerId

  Owner.findById(ownerId, (err, owner) => {
    if(err) res.status(500).send({message: `Error al borrar datos del propietario ${err}`})

    owner.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar datos del propietario ${err}`})
      res.status(200).send({
        message: '200',
        message: `El propietario se ha sido eliminado`})
    })
  })
}

module.exports = {
  signUp,
  signIn,
  getOwner,
  getOwners,
  updateOwner,
  deleteOwner
}
