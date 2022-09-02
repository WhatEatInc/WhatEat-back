const { Example } = require("../models/example.model");
const { validationResult } = require("express-validator");
const {
  NOT_FOUND,
  OK,
  CREATED,
  BAD_REQUEST,
  INTERNAL_SERVER_ERROR,
} = require("http-status");
const superagent = require("superagent");
const {
  apiKey,
  uselessAttributes,
  complexEndpoint,
  idEndpoint,
} = require("../config/spoonacular.config");
const { getCurrentUser } = require("./user.controller");
const {
  allergens,
  particularities,
  cookTypes,
  duration,
  durationMapToTime
} = require("../config/user-preferences.config");
const { User } = require("../models/user.model");
const { Recipe } = require("../models/recipe.model");

async function getRecipe(userPreferences) {
  // Here we construct the api req to Spoonacular

  let intoleranceString = encodeURIComponent(
    Array.from(userPreferences.allergens.values()).join(", ")
  );
  let cuisineString = encodeURIComponent(
    Array.from(userPreferences.cookTypes.values()).join(", ")
  );
  let dietString = encodeURIComponent(
    Array.from(userPreferences.particularities.values()).join(", ")
  );

  let maxTime = durationMapToTime[duration[userPreferences.duration]];

  //Basically there's 2 different behaviour based on the "Healthy" preferences
  if (userPreferences.healthy === true) {
    let tempRes = new Promise((resolve, reject) => {
      return superagent
        .get(complexEndpoint)
        .query({
          apiKey: apiKey,
          type: "main course",
          sort: "healthiness",
          intolerance: intoleranceString,
          cuisine: cuisineString,
          diet: dietString,
          number: "100",
          fillIngredients: "true",
          addRecipeInformation: "true",
          maxReadyTime: maxTime,
        })
        .accept("json")
        .end((err, res) => {
          if (!err) {
            // throw smth
            // reject('Bonus error.');
            resolve(res.body.results);
          } else {
            console.log("error present", err);
            reject(err);
          }
        });
    });

    let top100RecipesHealthy = await tempRes;

    recipeId = getRandom(top100RecipesHealthy).id;

    return new Promise((resolve, reject) => {
      return superagent
        .get("https://api.spoonacular.com/recipes/" + recipeId + "/information")
        .query({ apiKey: apiKey, includeNutrition: "true", addRecipeInformation: "true" })
        .accept("json")
        .end((err, res) => {
          if (!err) {
            // throw smth
            // reject('Bonus error.');

            resolve(res.body);
          } else {
            console.log("error present", err);
            reject(err);
          }
        });
    });
  }

  return new Promise((resolve, reject) => {
    return superagent
      .get(complexEndpoint)
      .query({
        apiKey: apiKey,
        addRecipeInformation: "true",
        type: "main course",
        sort: "random",
        intolerance: intoleranceString,
        cuisine: cuisineString,
        diet: dietString,
        number: "1",
        fillIngredients: "true",
        addRecipeInformation: "true",
        maxReadyTime: maxTime,
      })
      .accept("json")
      .end((err, res) => {
        if (!err) {
          // throw smth
          // reject('Bonus error.');
          resolve(res.body.results[0]);
        } else {
          console.log("error present", err);
          reject(err);
        }
      });
  });

}

async function get(req, res) {
  let connectedUser =  await getCurrentUser(req,res);

    try {

        let stockedTime = new Date(connectedUser.recipeDate)
        let actualTimeDate = new Date(Date.now())
        let recipeResult;

        if(connectedUser.recipe === "" ||
          (stockedTime.getDate < actualTimeDate.getDate &&
           stockedTime.getMonth < actualTimeDate.getMonth &&
           stockedTime.getFullYear < actualTimeDate.getFullYear)){

            recipeResult = await getNewRandomRecipe(connectedUser)

        }else{
          recipeResult = JSON.parse(connectedUser.recipe)
        }

        res.status(OK).json(filterRecipe
         (recipeResult)).end();
  
    } catch (error) {

      console.log("Error")
        res.json({
            status: error,

        })
    }
}


async function reroll(req, res){
  let connectedUser =  await getCurrentUser(req,res);
  try{

    const apiRes = await getNewRandomRecipe(connectedUser)

    res.status(OK).json(filterRecipe
     (apiRes)).end();

  }catch{

    console.log("Error")
        res.json({
            status: error,
        })
  }
}



async function getAllergens(req, res) {
  res.json({
    allergens: allergens,
  });
}

async function getCookTypes(req, res) {
  res.json({
    cookTypes: cookTypes,
  });
}

async function getParticularities(req, res){

    res.json({
        particularities : particularities
    })
}

async function getDuration(req, res) {
  res.json({
    duration: duration,
  });
}

// This function get a new recipe from spoonacular,
// Save it in the DB, save the current date in the DB
// ans send back a JSON of the recipe
async function getNewRandomRecipe(connectedUser){
  userPreferences = connectedUser.preferences;

  const apiRes = await getRecipe(userPreferences)

  connectedUser.recipe = JSON.stringify(apiRes)
  connectedUser.recipeDate = Date.now()

  connectedUser.save()

  return apiRes
}

// This function parses the JSON result of spoonacular
// returns only useful attributes
function filterRecipe(jsonFromSpoon) {
  const recipe = new Recipe({
    title:        jsonFromSpoon.title,
    summary:      jsonFromSpoon.summary,
    image:        jsonFromSpoon.image,
    steps:        jsonFromSpoon.analyzedInstructions,
    servings:     jsonFromSpoon.servings,
    ingredients:  jsonFromSpoon.extendedIngredients
  });

  return recipe;
}

module.exports = {
  get,
  getAllergens,
  getCookTypes,
  getParticularities,
  getDuration,
  reroll
};

function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

