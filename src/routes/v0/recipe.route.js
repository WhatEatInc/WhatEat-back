const express = require("express");
const recipeRouter = express.Router();
const recipeController = require("../../controllers/recipe.controller");
const { body } = require("express-validator");

/**
 * @api {get} /recipe/get Get a recipe
 * @apiName get
 * @apiGroup Recipe
 * 
 * @apiDescription Get a recipe for the user. If the user already has a valid recipe in the DB, returns it. 
 * If there is no recipe, or the recipe is too old, get a new recipe with the user preferences and store it in DB.
 *
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *     {
 *    "title": "How to Make Party Jollof Rice",
 *    "summary": "The recipe How to Make Party Jollof Rice is ready <b>in about 45 minutes</b> and is definitely an amazing <b>gluten free and vegan</b> option for lovers of African food. For <b>$1.35 per serving</b>, this recipe <b>covers 20%</b> of your daily requirements of vitamins and minerals. This recipe makes 3 servings with <b>528 calories</b>, <b>12g of protein</b>, and <b>2g of fat</b> each. Many people made this recipe, and 347 would say it hit the spot. If you have bay leaves, roma tomatoes, salt, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/jollof-rice-with-chicken-from-ghana-728651\">Jollof Rice with Chicken from Ghana</a>, <a href=\"https://spoonacular.com/recipes/chex-party-mix-it-is-easy-to-make-599956\">Chex Party Mix – it is easy to make</a>, and <a href=\"https://spoonacular.com/recipes/make-ahead-party-mashed-potatoes-329849\">Make-Ahead Party Mashed Potatoes</a> for similar recipes.",
 *    "image": "https://spoonacular.com/recipeImages/716298-556x370.jpg",
 *    "steps": [
 *        {
 *            "name": "",
 *            "steps": [
 *                {
 *                    "number": 1,
 *                    "step": "*Wash rice by rubbing the rice between your palms in a bowl of water and draining the water till clear.Blend tomatoes, pepper and garlic and bring to boil till the excess water dries up.Chop Onions",
 *                    "ingredients": [
 *                        {
 *                            "id": 11529,
 *                            "name": "tomato",
 *                            "localizedName": "tomato",
 *                            "image": "tomato.png"
 *                        },
 *                        {
 *                            "id": 11215,
 *                            "name": "garlic",
 *                            "localizedName": "garlic",
 *                            "image": "garlic.png"
 *                        },
 *                        .
 *                        .
 *                        .
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404783,
 *                            "name": "bowl",
 *                            "localizedName": "bowl",
 *                            "image": "bowl.jpg"
 *                        }
 *                    ]
 *                },
 *                {
 *                    "number": 2,
 *                    "step": "Heat up vegetable oil and pour in chopped onions and fry.",
 *                    "ingredients": [
 *                        {
 *                            "id": 4669,
 *                            "name": "vegetable oil",
 *                            "localizedName": "vegetable oil",
 *                            "image": "vegetable-oil.jpg"
 *                        },
 *                        {
 *                            "id": 11282,
 *                            "name": "onion",
 *                            "localizedName": "onion",
 *                            "image": "brown-onion.png"
 *                        }
 *                    ],
 *                    "equipment": []
 *                },
 *                .
 *                .
 *                .
 *            ]
 *        }
 *    ],
 *    "servings": 3,
 *    "ingredients": [
 *        {
 *            "id": 2004,
 *            "aisle": "Produce;Spices and Seasonings",
 *            "image": "bay-leaves.jpg",
 *            "consistency": "SOLID",
 *            "name": "bay leaves",
 *            "nameClean": "bay leaves",
 *            "original": "2 Bay leaves",
 *            "originalName": "Bay leaves",
 *            "amount": 2,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 2,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        .
 *        .
 *        .
 *    ],
 *    "_id": "6315f56b7627dbd3a47c5276"
 * }
 * @apiError {json} Error-Response:
 *      {
 *          error: "Could not retrieve recipe",
 *      }
 */
 recipeRouter.get("/get", recipeController.get);


/**
 * @api {get} /recipe/reroll Reroll
 * @apiName reroll
 * @apiGroup Recipe
 * 
 * @apiDescription Get a new recipe from spoonacular erase and replace what is stored in database 
 * 
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *     {
 *    "title": "How to Make Party Jollof Rice",
 *    "summary": "The recipe How to Make Party Jollof Rice is ready <b>in about 45 minutes</b> and is definitely an amazing <b>gluten free and vegan</b> option for lovers of African food. For <b>$1.35 per serving</b>, this recipe <b>covers 20%</b> of your daily requirements of vitamins and minerals. This recipe makes 3 servings with <b>528 calories</b>, <b>12g of protein</b>, and <b>2g of fat</b> each. Many people made this recipe, and 347 would say it hit the spot. If you have bay leaves, roma tomatoes, salt, and a few other ingredients on hand, you can make it. All things considered, we decided this recipe <b>deserves a spoonacular score of 93%</b>. This score is outstanding. Try <a href=\"https://spoonacular.com/recipes/jollof-rice-with-chicken-from-ghana-728651\">Jollof Rice with Chicken from Ghana</a>, <a href=\"https://spoonacular.com/recipes/chex-party-mix-it-is-easy-to-make-599956\">Chex Party Mix – it is easy to make</a>, and <a href=\"https://spoonacular.com/recipes/make-ahead-party-mashed-potatoes-329849\">Make-Ahead Party Mashed Potatoes</a> for similar recipes.",
 *    "image": "https://spoonacular.com/recipeImages/716298-556x370.jpg",
 *    "steps": [
 *        {
 *            "name": "",
 *            "steps": [
 *                {
 *                    "number": 1,
 *                    "step": "*Wash rice by rubbing the rice between your palms in a bowl of water and draining the water till clear.Blend tomatoes, pepper and garlic and bring to boil till the excess water dries up.Chop Onions",
 *                    "ingredients": [
 *                        {
 *                            "id": 11529,
 *                            "name": "tomato",
 *                            "localizedName": "tomato",
 *                            "image": "tomato.png"
 *                        },
 *                        {
 *                            "id": 11215,
 *                            "name": "garlic",
 *                            "localizedName": "garlic",
 *                            "image": "garlic.png"
 *                        },
 *                        .
 *                        .
 *                        .
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404783,
 *                            "name": "bowl",
 *                            "localizedName": "bowl",
 *                            "image": "bowl.jpg"
 *                        }
 *                    ]
 *                },
 *                {
 *                    "number": 2,
 *                    "step": "Heat up vegetable oil and pour in chopped onions and fry.",
 *                    "ingredients": [
 *                        {
 *                            "id": 4669,
 *                            "name": "vegetable oil",
 *                            "localizedName": "vegetable oil",
 *                            "image": "vegetable-oil.jpg"
 *                        },
 *                        {
 *                            "id": 11282,
 *                            "name": "onion",
 *                            "localizedName": "onion",
 *                            "image": "brown-onion.png"
 *                        }
 *                    ],
 *                    "equipment": []
 *                },
 *                .
 *                .
 *                .
 *            ]
 *        }
 *    ],
 *    "servings": 3,
 *    "ingredients": [
 *        {
 *            "id": 2004,
 *            "aisle": "Produce;Spices and Seasonings",
 *            "image": "bay-leaves.jpg",
 *            "consistency": "SOLID",
 *            "name": "bay leaves",
 *            "nameClean": "bay leaves",
 *            "original": "2 Bay leaves",
 *            "originalName": "Bay leaves",
 *            "amount": 2,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 2,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        .
 *        .
 *        .
 *    ],
 *    "_id": "6315f56b7627dbd3a47c5276"
 * }
 * @apiError {json} Error-Response:
 *      {
 *          error: "Could not retrieve recipe",
 *      }
 */
 recipeRouter.get("/reroll", recipeController.reroll);

/**
 * @api {get} /recipe/getAllergens Get a list of allergen
 * @apiName getAllergens
 * @apiGroup Recipe
 * 
 * @apiDescription Return a list of all the allergens supported
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
 * @api {get} /recipe/getCookTypes Get a list of cooking style
 * @apiName getCookTypes
 * @apiGroup Recipe
 * 
 * @apiDescription Return a list of all the cooking style supported
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
 * @api {get} /recipe/getParticularities Get a list of diets
 * @apiName getParticularities
 * @apiGroup Recipe
 * 
 * @apiDescription Return a list of all the diets supported
 * 
 * @apiSuccessExample {json} Success-Response:
 *          HTTP/1.1 200 OK
 *          {
 *              "particularities": {
 *                                  "Gluten Free": "Gluten Free",
 *                                  "Ketogenic": "Ketogenic",
 *                                  "Vegan": "Vegan",
 *                                  "Vegetarien": "Vegetarien",
 *                                  "Pescetarian": "Pescetarian",
 *                                  "Paleo": "Paleo"
 *                                 }
 *          }
 */
recipeRouter.get("/getParticularities", recipeController.getParticularities);

/**
 * @api {get} /recipe/getDuration Get a list of the durations supported
 * @apiName getDuration
 * @apiGroup Recipe
 * 
 * @apiDescription Return a list of the differents duration supported, short(<20min), medium(<50min), long(infinite)
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


module.exports = recipeRouter;
