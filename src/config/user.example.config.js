const mongoose = require('mongoose')
const { Preference } = require('../models/preference.model')
const { User } = require('../models/user.model')
const {allergens, particularities, cookTypes, duration} = require("../config/user-preferences.config")



const preferenceExample = new Preference({
    allergens: allergens,
    particularities: particularities,
    cookTypes: cookTypes,
    duration: 1,
    healthy: true

});


const userExample = new User({
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@yopmail.com",
    password: "AniceHash",
    preferences : preferenceExample,
    token: "JWT",
});


module.exports = {
    userExample: userExample

}
