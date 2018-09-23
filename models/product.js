'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  brand: String,
  name: String,
  photo: String,
  description: String,
  price: Number,
  quantity: Number
})

module.exports = mongoose.model('Product', ProductSchema)
