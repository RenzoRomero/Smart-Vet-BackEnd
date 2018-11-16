'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const Pet = mongoose.model('Pet')

const clinicHistorySchema = Schema({
  date: Date,
  pet: {type: Schema.ObjectId, ref: "Pet"},
  weight: Number,
  height: Number,
  details: String
})

module.exports = mongoose.model('ClinicHistory',clinicHistorySchema)
