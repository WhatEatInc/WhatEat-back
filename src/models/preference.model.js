const mongoose = require('mongoose')

const preferenceSchema = new mongoose.Schema({
    allergens: {
        type: Map,
        of: String,
        default: {} 
    },
    particularities: {
        type: Map,
        of: String,
        default: {} 
    },
    cookTypes: {
        type: Map,
        of: String,
        default: {} 
    },
    healthy: { type: Boolean,  default: false },
    duration: { type: Number,  default: 2 }

}, { minimize: false })

const Preference = mongoose.model('Preference', preferenceSchema)

module.exports = { Preference, preferenceSchema }
