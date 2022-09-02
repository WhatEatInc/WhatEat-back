const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../../controllers/recipe.controller");
const { body } = require("express-validator");

/**
 * @api {get} /recipe/get Get a random receipe depending on the user settings
 * @apiName get
 * @apiGroup Recipe
 *
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *         {
 *              "vegetarian": false,
 *              "vegan": false,
 *              .
 *              .
 *              .
 *              "extendedIngredients": [
 *                  {
 *                      "id": 11233,
 *                      "aisle": "Produce",
 *                      "image": "kale.jpg",
 *                      "consistency": "SOLID",
 *                      "name": "kale",
 *                      "nameClean": "kale",
 *                      "original": "1 1/2 pounds kale, larger stems removed, and leaves chopped (can substitute 1/4 cup olive oil",
 *                      "originalName": "kale, larger stems removed, and leaves chopped (can substitute 1/4 cup olive oil",
 *                      "amount": 1.5,
 *                      "unit": "pounds",
 *                      "meta": [
 *                          "chopped"
 *                      ],
 *                      "measures": {
 *                          "us": {
 *                              "amount": 1.5,
 *                              "unitShort": "lb",
 *                              "unitLong": "pounds"
 *                          },
 *                          "metric": {
 *                              "amount": 680.389,
 *                              "unitShort": "g",
 *                              "unitLong": "grams"
 *                          }
 *                      }
 *                  },
 *                  .
 *                  .
 *                  .
 *              ],
 *              "id": 665150,
 *              "title": "White Bean, Kale, and Tomato Stew",
 *              "readyInMinutes": 45,
 *              "servings": 3,
 *              "image": "https://spoonacular.com/recipeImages/665150-556x370.jpg",
 *              "imageType": "jpg",
 *              "summary": "White Bean, Kale, and Tomato Stew might be just the main course you are searching for. One portion of this dish contains around <b>26g of protein</b>, <b>6g of fat</b>, and a total of <b>367 calories</b>. This recipe serves 3 and costs $2.33 per serving. It will be a hit at your <b>Autumn</b> event. If you have kale, salt and pepper, parmesan, and a few other ingredients on hand, you can make it. 1 person found this recipe to be delicious and satisfying. It is brought to you by Foodista. It is a good option if you're following a <b>gluten free</b> diet. From preparation to the plate, this recipe takes roughly <b>roughly 45 minutes</b>. Overall, this recipe earns a <b>super spoonacular score of 93%</b>. If you like this recipe, you might also like recipes such as <a href=\"https://spoonacular.com/recipes/white-bean-and-kale-stew-12073\">White Bean And Kale Stew</a>, <a href=\"https://spoonacular.com/recipes/kale-and-white-bean-stew-594785\">Kale and White Bean Stew</a>, and <a href=\"https://spoonacular.com/recipes/kale-white-bean-and-potato-stew-15246\">Kale, White Bean, And Potato Stew</a>.",
 *              "cuisines": [],
 *              "dishTypes": [
 *                  "soup",
 *                  "lunch",
 *                  "main course",
 *                  "main dish",
 *                  "dinner"
 *              ],
 *              "diets": [
 *                  "gluten free"
 *              ],
 *              "occasions": [
 *                  "fall",
 *                  "winter"
 *              ],
 *              "winePairing": {
 *                  "pairedWines": [
 *                      "cabernet sauvignon",
 *                      "chablis",
 *                      "malbec"
 *                  ],
 *                  "pairingText": "Cabernet Sauvignon, Chablis, and Malbec are my top picks for Stew. Full-bodied red wines like malbec and cabernet sauvignon are the perfect accompaniment for beef stew. Fish stew probably calls for a white wine, such as chablis. One wine you could try is Januik Winery Cabernet Sauvignon. It has 4.6 out of 5 stars and a bottle costs about 33 dollars.",
 *                  "productMatches": [
 *                      {
 *                          "id": 449129,
 *                          "title": "Januik Winery Cabernet Sauvignon",
 *                          "description": "This concentrated, full-bodied Cabernet Sauvignon is brimming with both red and black fruits, spice, and black licorice followed by warm vanilla notes in the nose. Its texture is quite supple and lingers across the palate, imparting a long, polished finish that was developed in part from the use of new French Oak barrels.\nBlend: 89% Cabernet Sauvignon, 7% Merlot, 2% Cabernet Franc, 2% Malbec",
 *                          "price": "$32.99",
 *                          "imageUrl": "https://spoonacular.com/productImages/449129-312x231.jpg",
 *                          "averageRating": 0.9199999999999999,
 *                          "ratingCount": 7,
 *                          "score": 0.8745454545454545,
 *                          "link": "https://click.linksynergy.com/deeplink?id=*QCiIS6t4gA&mid=2025&murl=https%3A%2F%2Fwww.wine.com%2Fproduct%2Fjanuik-winery-cabernet-sauvignon-2014%2F196305"
 *                      }
 *                  ]
 *              },
 *              "instructions": "Fill a large stockpot halfway with water. Bring to a boil and then toss in the kale leaves. Reduce heat to a simmer and cook for 6-8 minutes or until leaves are tender (not mushy). Drain leaves in a colander.\nWipe out any excess water from the pot. Place back on burner and turn to medium heat. Add olive oil, garlic, and red pepper, and saut for 1 minute, stirring occasionally.\nAdd the tomatoes and bring to a boil. Add the beans and broth, and bring to a boil again. Cook for 3 minutes, stirring often.\nReduce heat to a simmer and add the kale. Cook for 5 minutes. Season with salt and pepper to taste. Garnish with Parmesan.",
 *              "analyzedInstructions": [
 *                  {
 *                      "name": "",
 *                      "steps": [
 *                          {
 *                              "number": 1,
 *                              "step": "Fill a large stockpot halfway with water. Bring to a boil and then toss in the kale leaves. Reduce heat to a simmer and cook for 6-8 minutes or until leaves are tender (not mushy).",
 *                              "ingredients": [
 *                                  {
 *                                      "id": 14412,
 *                                      "name": "water",
 *                                      "localizedName": "water",
 *                                      "image": "water.png"
 *                                  },
 *                                  {
 *                                      "id": 11233,
 *                                      "name": "kale",
 *                                      "localizedName": "kale",
 *                                      "image": "kale.jpg"
 *                                  }
 *                              ],
 *                              "equipment": [
 *                                  {
 *                                      "id": 404752,
 *                                      "name": "pot",
 *                                      "localizedName": "pot",
 *                                      "image": "stock-pot.jpg"
 *                                  }
 *                              ],
 *                              "length": {
 *                                  "number": 8,
 *                                  "unit": "minutes"
 *                              }
 *                          },
 *                          .
 *                          .
 *                          .
 *                      ]
 *                  }
 *              ]
 *          }
 * @apiError {json} Error-Response:
 *      {
 *          "error": error,
 *      }
 */
 recipeRouter.get("/get", recipeController.get);

 recipeRouter.get("/reroll", recipeController.reroll);

/**
 * @api {get} /recipe/getAllergens Get a list of all allergens supported by the API
 * @apiName getAllergens
 * @apiGroup Recipe
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *          {
 *              "allergens": {"Dairy":"Dairy", 
 *                            "Egg":"Egg", 
 *                            "Sesame":"Sesame",
 *                            ...
 *                           }
 *          }
 */
recipeRouter.get("/getAllergens", recipeController.getAllergens);

/**
 * @api {get} /recipe/getCookTypes Get a list of all cooking type supported by the API
 * @apiName getCookTypes
 * @apiGroup Recipe
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *          {
 *              "cookTypes": {  "African":"African", 
 *                              "American":"American", 
 *                              "British":"British",
 *                              ...
 *                           }
 *          }
 */
recipeRouter.get("/getCookTypes", recipeController.getCookTypes);

/**
 * @api {get} /recipe/getParticularities Get a list of all the diets type supported by the API
 * @apiName getParticularities
 * @apiGroup Recipe
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *          {
 *              "particularities": {"African":"African", 
 *                                  "American":"American", 
 * *                                "British":"British",
 *                                  ...
 *                                  }
 *          }
 */
recipeRouter.get("/getParticularities", recipeController.getParticularities);

/**
 * @api {get} /recipe/getDuration Get a list of all the diets type supported by the API
 * @apiName getDuration
 * @apiGroup Recipe
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *          {
 *              "duration": {"0" : "Short",
 *                           "1" : "Medium",
 *                           "2" : "Long"}
 *                          }
 *          }
 */
recipeRouter.get("/getDuration", recipeController.getDuration);


recipeRouter.post(
  "/post",
  body("hello").trim().not().isEmpty({ ignore_whitespace: true }),
  body("world").trim().not().isEmpty({ ignore_whitespace: true }),
  recipeController.post
);

module.exports = recipeRouter;
