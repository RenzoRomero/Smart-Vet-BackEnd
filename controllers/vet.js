'use strict'

const mongoose = require('mongoose')
const Vet = require('../models/vet')
const service = require('../services')

function signUp (req, res) {
  const vet = new Vet({
    email: req.body.email,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    address: req.body.address,
    phone: req.body.phone,
    sex: req.body.sex
  })

  vet.save((err) => {
    if (err) return res.status(500).send({ message: `Error al crear veterinario: ${err}` })

    return res.status(200).send({
      message: 'Te has registrado correctamente',
      token: service.createToken(vet)
    })
  })
}

function signIn (req, res) {
  Vet.findOne({ email: req.body.email }, (err, vet) => {
    if (err) return res.status(500).send({ message: err})
    if (!vet) return res.status(404).send({ message: `No existe el usuario` })

    return vet.comparePassword(req.body.password, (err, isMatch) => {
      if (err) return res.status(500).send({ message: `Error al ingresar: ${err}` })
      if (!isMatch) return res.status(404).send({ message: `Error de contraseña: ${req.body.email}` })

      req.vet = vet
      return res.status(200).send({
        message: 'Te has logueado correctamente',
        token: service.createToken(vet)
      })
    });

  }).select('_id email + password');
}

function getVet (req, res) {
  let vetId = req.params.vetId

  Vet.findById(vetId, (err, vet) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!vet) return res.status(404).send({message: `La mascota no existe`})

    res.status(200).send({ vets })
  })
}

function getVets (req, res) {
  Vet.find({}, (err,vets) => {
    if (err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if (!vets) return res.status(404).send({message: `No existen mascotas`})

    res.status(200).send({ vets })
  })
}

module.exports = {
  signUp,
  signIn,
  getVet,
  getVets
}
