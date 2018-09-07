'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PetSchema = Schema({
  name: String,
  photo: String,
  breed: String,
  gender: {type: String, enum: ['male','female']},
  owner: String
})

module.exports = mongoose.model('Pet',PetSchema)
