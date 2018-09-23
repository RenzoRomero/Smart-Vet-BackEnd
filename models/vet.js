'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
mongoose.set('useCreateIndex', true)

const VetSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  firstName: String,
  lastName: String,
  password: { type: String, select: true },
  photo: { type: String, default: "" },
  address: String,
  mobilePhone: Number,
  sex: {type: String, enum: ['man','woman']},
  status: { type: String, default: "A" },
  signupDate: { type: Date, default: Date.now() }
})

VetSchema.pre('save', function(next) {
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

VetSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  });
}

module.exports = mongoose.model('Vet', VetSchema)
