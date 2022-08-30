const mongoose = require('mongoose')
const { Preference } = require('../models/preference.model')
const { User } = require('../models/user.model')
const {allergen} = require("../config/spoonacular.config")



const preferenceExample = new Preference({
    alergens: allergen

});


//preferenceExample.allergens.set(spoonacular.allergen);

exampleUser = new User({
    firstname: "John",
    lastname: "Doe",
    email: "johndoe@yopmail.com",
    password: "AniceHash",
    token: "JWT",
});

module.exports = {
    exampleUser: this.exampleUser

}
