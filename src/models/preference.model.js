const mongoose = require('mongoose')

const preferenceSchema = new mongoose.Schema({
    allergens: { type: Array },
    particularite: { type: Array },
    healthy: { type: Boolean},
    duration: { type: Number},
    prefCook: { type: Array}
})

const Preference = mongoose.model('Preference', preferenceSchema)

module.exports = { Preference }