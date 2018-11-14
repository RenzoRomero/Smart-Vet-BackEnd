'use strict'

const Promotion = require('../models/promotion')

function getPromotion (req, res) {
  let promotionId = req.params.promotionId

  Promotion.findById(promotionId, (err, promotion) => {
    if(err) return res.status(500).send({message: `Error al realizar la petición: ${err}`})
    if(!promotion) return res.status(404).send({message: `Error la promoción no existe`})

    res.status(200).send({ promotion })
  })
}

function getPromotions (req, res) {
  Promotion.find({}, (err, promotions) => {
    if(err) return res.status(500).send({message: `Error al realizar la peticion: ${err}`})
    if(!promotions) return res.status(404).send({message: `No existen promociones`})

    res.status(200).send({ promotions })
  })
}

function savePromotion (req, res) {
  console.log('POST /api/promotion')
  console.log(req.body)

  let promotion = new Promotion()
  promotion.name = req.body.name
  promotion.photo = req.body.photo
  promotion.description = req.body.description
  promotion.startDate = req.body.startDate
  promotion.endingDate = req.body.endingDate

  promotion.save((err, promotionStored) => {
    if(err) res.status(500).send({message: `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({promotion: promotionStored})
  })
}

function updatePromotion (req, res) {
  let promotionId = req.params.promotionId
  let update = req.body

  Promotion.findByIdAndUpdate(promotionId, update, (err, promotionUpdated) =>{
    if(err) res.status(500).send({message: `Error al actualizar la promoción ${err}`})

    res.status(200).send({ promotion: promotionUpdated})
  })
}

function deletePromotion (req, res) {
  let promotionId = req.params.promotionId

  Promotion.findById(promotionId, (err, promotion) => {
    if(err) res.status(500).send({message: `Error al borrar la promoción ${err}`})

    promotion.remove(err => {
      if(err) res.status(500).send({message: `Error al borrar la promoción ${err}`})
      res.status(200).send({message: `La promoción se ha sido eliminada`})
    })
  })
}

module.exports = {
  getPromotion,
  getPromotions,
  savePromotion,
  updatePromotion,
  deletePromotion
}
