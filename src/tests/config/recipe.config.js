const request = require("supertest");
const app = require("../../app");
const { User } = require("../../models/user.model");
const {
    allergens,
    particularities,
    cookTypes,
    duration,
  } = require("../../config/user-preferences.config");
const jwt = require("jsonwebtoken");

const JohnDoe = {

    firstname: "John",
    lastname: "Doe",
    email: "john@doe.com",
    password: "Re4allyCompl3x*Pass"

    }

const allAllergens = {

    allergens: allergens

}

const allCookingType = {

    cookTypes: cookTypes
    
}

const allParticularities = {

    particularities: particularities
    
}

const allDuration = {

    duration: duration
    
}
async function insertUserInDB(user){
    return res = await request(app)
    .post('/v0/user/register')
    .send(user)
}

async function changeRecipeDate(currentUser){
    
    let time = new Date(currentUser.recipeDate)
    time.setDate(time.getDate() - 1)
    currentUser.recipeDate = time.getTime()
    currentUser.save()
}

module.exports = {
    JohnDoe: JohnDoe,
    allAllergens: allAllergens,
    allCookingType: allCookingType,
    allParticularities: allParticularities,
    allDuration: allDuration,
    insertUserInDB,
    changeRecipeDate,
};