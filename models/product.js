'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  brand: String,
  name: String,
  picture: String,
  description: String,
  price: Number,
  Quantity: Number
})

module.exports = mongoose.model('Product', ProductSchema)
