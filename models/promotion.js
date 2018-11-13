'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PromotionSchema = new Schema({
  name: String,
  description: String,
  photo: String,
  startDate: String,
  endingDate: String
})

module.exports = mongoose.model('Promotion', PromotionSchema)
