const mongoose = require('mongoose')

const preferenceSchema = new mongoose.Schema({
    allergens: {
        type: Map,
        of: String
    },
    particularities: {
        type: Map,
        of: String
    },
    cookTypes: {
        type: Map,
        of: String
    },
    healthy: { type: Boolean },
    duration: { type: Number }

})

const Preference = mongoose.model('Preference', preferenceSchema)

module.exports = { Preference }
