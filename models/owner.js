'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
mongoose.set('useCreateIndex', true)

const OwnerSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  name: String,
  lastName: String,
  password: { type: String, select: true },
  photo: { type: String, default: "" },
  address: String,
  mobilePhone: Number,
  gender: {type: String, enum: ['Man','Woman']},
  status: { type: String, default: "A" },
  signUpDate: { type: Date, default: Date.now() }
})

OwnerSchema.pre('save', function(next) {
  if (!this.isModified('password')) return next()

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.password, salt, null, (err, hash) => {
      if (err) return next(err)

      this.password = hash
      next()
    })
  })
})

OwnerSchema.pre('findOneAndUpdate', function(next) {

  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(this.getUpdate().password, salt, null, (err, hash) => {
      if (err) return next(err)

      this.getUpdate().password = hash
      next()
    })
  })
})

OwnerSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  });
}

module.exports = mongoose.model('Owner', OwnerSchema)
