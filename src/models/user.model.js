const mongoose = require('mongoose')
const { Preference } = require('./preference.model')

const userSchema = new mongoose.Schema({
    firstname : { type: String },
    lastname : { type: String },
    mail: { type: String },
    password: { type: String },
    preference : { type: Preference },
})

const Example = mongoose.model('User', userSchema)

module.exports = { User }