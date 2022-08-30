const mongoose = require('mongoose')

const preferenceSchema = new mongoose.Schema({
    alergens: {
        type: Map,
        of: String
    },
    particularities: {
        type: Map,
        of: String
    },
    cookType: {
        type: Map,
        of: String
    },
    healthy: { type: Boolean },
    duration: { type: Number }

})

const Preference = mongoose.model('Preference', preferenceSchema)

module.exports = { Preference }
