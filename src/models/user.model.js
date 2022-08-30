const mongoose = require('mongoose')
const { Preference } = require('./preference.model')

const userSchema = new mongoose.Schema({
    firstname : { type: String },
    lastname : { type: String },
    email: { type: String },
    password: { type: String },
    preferences : {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Preference'
   }
})

const User = mongoose.model('User', userSchema)

module.exports = { User }