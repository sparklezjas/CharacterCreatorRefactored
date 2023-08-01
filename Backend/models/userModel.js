const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Username is required'],
        unique: true,
        minlength: [1, 'Name must be at least 1 character'],
        maxlength: [20, 'Name must be 20 characters or less'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        validate: {
        validator: (value) => validator.isEmail(value),
        message: 'Invalid email format',
        },
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    })

// static signup method
userSchema.statics.signup = async function(name, email, password) {

  // validation
    if (!name || !email || !password ) {
    throw Error('HALT! All fields must be filled!')
    }
    if (!name) {
        throw new Error('Name field must be filled');
    }
    if (name.length > 30) {
        throw new Error('Name must be 30 characters or less');
    }
    if (!validator.isEmail(email)) {
    throw Error('Email not valid')
    }
    if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
    }

    const exists = await this.findOne({ email })

    if (exists) {
    throw Error('Email already in use')
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ name, email, password: hash })

    return user
}

// static login method
userSchema.statics.login = async function(email, password) {

    if (!email || !password) {
    throw Error('HALT! All fields must be filled!')
}

    const user = await this.findOne({ email })
    if (!user) {
    throw Error('Incorrect email')
}

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
    throw Error('Incorrect password')
}

    return user
}

module.exports = mongoose.model('User', userSchema)