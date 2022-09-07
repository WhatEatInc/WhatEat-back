const {OK} = require("http-status");
const superagent = require("superagent");

const {
  apiKey,
  complexEndpoint,
  recipeEndpoint,
} = require("../config/spoonacular.config");

const { getCurrentUser } = require("./user.controller");

const {
  allergens,
  particularities,
  cookTypes,
  duration,
  durationMapToTime
} = require("../config/user-preferences.config");
const { Recipe } = require("../models/recipe.model");

/** This function constructs the query based on user preferences 
 *  it returns recipe from spoonacular
 */
async function getRecipe(userPreferences) {

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
    //If healthy is set, we need to get 100 recipes and then randomly select one ourselves
    //Spoonacular API doesn't provide a way to get a random healthy recipe in one shot.
    let tempRes = new Promise((resolve, reject) => {
      return superagent
        .get(complexEndpoint)
        .query({
          apiKey: apiKey,
          type: "main%20course",
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
            resolve(res.body.results);
          } else {
            reject(err);
          }
        });
    });

    
    let top100RecipesHealthy = await tempRes;


    //Once we retrieved 100 recipes we randomly select one of them 
    let recipeId = getRandom(top100RecipesHealthy).id;

    return new Promise((resolve, reject) => {
      return superagent
        .get(recipeEndpoint + recipeId + "/information")
        .query({ apiKey: apiKey, includeNutrition: "true", addRecipeInformation: "true" })
        .accept("json")
        .end((err, res) => {
          if (!err) {

            resolve(res.body);

          } else {

            reject(err);
            
          }
        });
    });
  }
  
// If healthy is not set we can do a one shot query

  return new Promise((resolve, reject) => {
    return superagent
      .get(complexEndpoint)
      .query({
        apiKey: apiKey,
        addRecipeInformation: "true",
        type: "main%20course",
        sort: "random",
        intolerance: intoleranceString,
        cuisine: cuisineString,
        diet: dietString,
        number: "1",
        addRecipeInformation: "true",
        maxReadyTime: maxTime,
      })
      .accept("json")
      .end((err, res) => {
        if (!err) {
          
          //We need to check wether the result contains or not at least one recipe
          if(typeof res.body.results[0] === 'undefined') {
            reject('Retrieve of recipe failed')
          }
          else{
            resolve(res.body.results[0]);
          }
          
        } else {
          reject(err);
        }
      });
  });

}

/** This function checks wether or not a recipe is already in the DB (recipe of the day)
 *  if not -> retrieve a new one from spoonacular API 
 *  in both case send back recipe to frontend
 */
async function get(req, res) {
  

  try {
    let connectedUser = await getCurrentUser(req, res);

    let stockedTime = new Date(connectedUser.recipeDate)
    let actualTimeDate = new Date(Date.now())

    if (connectedUser.recipe === "" ||
      (stockedTime.getDate() < actualTimeDate.getDate() ||
        stockedTime.getMonth() < actualTimeDate.getMonth() ||
        stockedTime.getFullYear() < actualTimeDate.getFullYear())) {

      return reroll(req,res);

    }

    
    recipeResult = JSON.parse(connectedUser.recipe)

    res.status(OK).json(filterRecipe
      (recipeResult)).end();
  } catch (err) {

    res.json({
      status: err
    }).end()
    
  }
}


/** This function get a new recipe from spoonacular,
    Save it in the DB, save the current date in the DB
    send back recipe to frontend */
async function reroll(req, res) {
  try {
    let connectedUser = await getCurrentUser(req, res);

    userPreferences = connectedUser.preferences;

    let apiRes = await getRecipe(userPreferences)

    if(apiRes === null){
      while(!apiRes.diets.includes(Array.from(userPreferences.particularities.values()).join(", ").toString())){
        apiRes = await getRecipe(userPreferences)
      }
    }
    
    connectedUser.recipe = JSON.stringify(apiRes)

    connectedUser.recipeDate = Date.now()
    connectedUser.save()

    res.status(OK).json(filterRecipe(apiRes)).end();
    return;

  } catch (err) {

    res.json({
      status: err,
    })

  }
}

/**  This function parses the JSON result of a spoonacularAPI call
     and returns an instance of the Recipe Model */
function filterRecipe(jsonFromSpoon) {
  const recipe = new Recipe({
    title: jsonFromSpoon.title,
    summary: jsonFromSpoon.summary,
    image: jsonFromSpoon.image,
    steps: jsonFromSpoon.analyzedInstructions,
    servings: jsonFromSpoon.servings,
    ingredients: jsonFromSpoon.extendedIngredients
  });

  return recipe;
}

/** Returns ALL available allergens */
async function getAllergens(req, res) {
  res.json({
    allergens: allergens,
  });
}

/** Returns ALL available cook types */
async function getCookTypes(req, res) {
  res.json({
    cookTypes: cookTypes,
  });
}

/** Returns ALL available particularities */
async function getParticularities(req, res) {

  res.json({
    particularities: particularities
  })
}

/** Returns ALL available durations */
async function getDuration(req, res) {
  res.json({
    duration: duration,
  });
}


/** return a random value from an array */
function getRandom(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports = {
  get,
  getAllergens,
  getCookTypes,
  getParticularities,
  getDuration,
  reroll
};



