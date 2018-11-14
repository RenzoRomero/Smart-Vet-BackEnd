'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Owner = mongoose.model('Owner')

const PetSchema = Schema({
  owner: {type: Schema.ObjectId, ref: "Owner"},
  name: String,
  photo: String,
  breed: String,
  birthdate: String,
  gender: {type: String, enum: ['Male','Female']},
  status: { type: String, default: "A" }
})

module.exports = mongoose.model('Pet',PetSchema)
