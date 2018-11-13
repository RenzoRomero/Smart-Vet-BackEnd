'use strict'

const Service = require('../models/service')

function getService (req, res) {
  let serviceId = req.params.serviceId

  Service.findById(serviceId, (err, service) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!service) return res.status(404).send({message: `Error el servicio no existe`})

    res.status(200).send({ service })
  })
}

function getServices (req, res) {
  Service.find({}, (err, services) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!services) return res.status(404).send({message: `No existen servicios`})

    res.status(200).send({ services })
  })
}

function saveService (req, res) {
  console.log('POST /api/service')
  console.log(req.body)

  let service = new Service()
  service.name = req.body.name
  service.photo = req.body.photo
  service.description = req.body.description
  service.price = req.body.price

  service.save((err, serviceStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({service: serviceStored})
  })
}

function updateService (req, res) {
  let serviceId = req.params.serviceId
  let update = req.body

  Service.findByIdAndUpdate(serviceId, update, (err, serviceUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar el servicio ${err}`})

    res.status(200).send({ service: serviceUpdated})
  })
}

function deleteService (req, res) {
  let serviceId = req.params.serviceId

  Service.findById(serviceId, (err, service) => {
    if(err) res.status(500).send({message: `Error al borrar el servicio ${err}`})

    service.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar el servicio ${err}`})
      res.status(200).send({message: `El servicio se ha sido eliminada`})
    })
  })
}

module.exports = {
  getService,
  getServices,
  saveService,
  updateService,
  deleteService
}
