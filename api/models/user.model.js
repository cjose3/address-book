const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const SALT_WORK_FACTOR = process.env.SALT_WORK_FACTOR

const schema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    required: [true, 'The email is required'],
    validate: {
      isAsync: false,
      message: 'The email is invalid',
      validator: value => validator.isEmail(value)
    }
  },
  password: {
    type: String,
    trim: true,
    minlength: [5, 'The password should be minimum 5 characters'],
    required: [true, 'The password is required']
  }
})

schema.pre('save', preSave)
schema.methods.validatePassword = validatePassword
schema.statics.create = create

if (!schema.options.toJSON) schema.options.toJSON = {}
schema.options.toJSON.transform = (doc, ret) => {
  delete ret.password
  delete ret.__v
  return ret
}

const User = mongoose.model('User', schema)

module.exports = User

// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Functions
// ------------------------------------------------------------------
// ------------------------------------------------------------------

async function preSave(next) {
  if (!this.isModified('password')) return next()
  try {
    const salt = await bcrypt.genSalt(Number(SALT_WORK_FACTOR))
    this.password = await bcrypt.hash(this.password, salt)
    next()
  } catch (err) {
    next(err)
  }
}

async function validatePassword(password) {
  const isEquals = await bcrypt.compare(password, this.password)
  return isEquals
    ? Promise.resolve()
    : Promise.reject(new Error('The password does not match'))
}

async function create(values) {
  try {
    const user = new User(values)
    const savedUser = await user.save()
    return User.findById(savedUser._id)
  } catch (err) {
    if (isDuplicateEmailError(err)) {
      err.status = 409
      err.message = 'The email is duplicated'
    }
    throw err
  }
}

function isDuplicateEmailError(err) {
  return err && !err.errors && err.message.indexOf('duplicate key error') !== -1
}
