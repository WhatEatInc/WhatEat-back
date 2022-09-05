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

const prefToSet = {
    "allergens": {
        "Dairy": "Dairy",
        "Egg": "Egg",
    },
    "particularities": {
        "Gluten Free": "Gluten%20Free"
    },
    "cookTypes": {
        "African": "African",
    },
    "healthy": false,
    "duration": 1,
}

const prefToTest = {
    "particularities": [
        "gluten free"
    ],
    "cookTypes": [
        "African"
    ],
    "healthy": false
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

async function setUserPref(currentUser){

    console.log(currentUser)
    currentUser.set({ preferences: prefToSet });
    await currentUser.save();
}

module.exports = {
    JohnDoe: JohnDoe,
    allAllergens: allAllergens,
    allCookingType: allCookingType,
    allParticularities: allParticularities,
    allDuration: allDuration,
    insertUserInDB,
    changeRecipeDate,
    setUserPref,
    prefToTest,
};