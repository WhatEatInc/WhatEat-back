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
 *                        {
 *                            "id": 11282,
 *                            "name": "onion",
 *                            "localizedName": "onion",
 *                            "image": "brown-onion.png"
 *                        },
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 14412,
 *                            "name": "water",
 *                            "localizedName": "water",
 *                            "image": "water.png"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        }
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
 *                {
 *                    "number": 3,
 *                    "step": "Pour in the can of tomato puree and fry.",
 *                    "ingredients": [
 *                        {
 *                            "id": 11547,
 *                            "name": "tomato puree",
 *                            "localizedName": "tomato puree",
 *                            "image": "tomato-paste.jpg"
 *                        }
 *                    ],
 *                    "equipment": []
 *                },
 *                {
 *                    "number": 4,
 *                    "step": "Pour in blended tomato and pepper mix into the pot and stir in.",
 *                    "ingredients": [
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 11529,
 *                            "name": "tomato",
 *                            "localizedName": "tomato",
 *                            "image": "tomato.png"
 *                        }
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404752,
 *                            "name": "pot",
 *                            "localizedName": "pot",
 *                            "image": "stock-pot.jpg"
 *                        }
 *                    ]
 *                },
 *                {
 *                    "number": 5,
 *                    "step": "Pour in salt, dry pepper, curry, thyme, bay leaves and maggi cubes.Allow it to simmer on low heat for 3 minutes.Reduce the heat to the lowest level and pour in the washed rice.",
 *                    "ingredients": [
 *                        {
 *                            "id": 2004,
 *                            "name": "bay leaves",
 *                            "localizedName": "bay leaves",
 *                            "image": "bay-leaves.jpg"
 *                        },
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 2015,
 *                            "name": "curry powder",
 *                            "localizedName": "curry powder",
 *                            "image": "curry-powder.jpg"
 *                        },
 *                        {
 *                            "id": 2049,
 *                            "name": "thyme",
 *                            "localizedName": "thyme",
 *                            "image": "thyme.jpg"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        },
 *                        {
 *                            "id": 2047,
 *                            "name": "salt",
 *                            "localizedName": "salt",
 *                            "image": "salt.jpg"
 *                        }
 *                    ],
 *                    "equipment": [],
 *                    "length": {
 *                        "number": 3,
 *                        "unit": "minutes"
 *                    }
 *                },
 *                {
 *                    "number": 6,
 *                    "step": "Pour in the water and stir and leave on low heat for 20 minutes or till the rice is soft.Tip: To get the party rice flavor, increase the heat on the rice and burn the bottom of the pot with the pot covered and stir the rice after 3 minutes of burning.Stir the rice and serve with any protein of your choice.  // <![CDATA[(adsbygoogle = window.adsbygoogle || []).push({});// ]]&gt;A video I shared on Instagram recently",
 *                    "ingredients": [
 *                        {
 *                            "id": 14412,
 *                            "name": "water",
 *                            "localizedName": "water",
 *                            "image": "water.png"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        }
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404752,
 *                            "name": "pot",
 *                            "localizedName": "pot",
 *                            "image": "stock-pot.jpg"
 *                        }
 *                    ],
 *                    "length": {
 *                        "number": 23,
 *                        "unit": "minutes"
 *                    }
 *                }
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
 *        {
 *            "id": 2015,
 *            "aisle": "Spices and Seasonings",
 *            "image": "curry-powder.jpg",
 *            "consistency": "SOLID",
 *            "name": "curry powder",
 *            "nameClean": "curry powder",
 *            "original": "1 Teaspoon of curry powder",
 *            "originalName": "curry powder",
 *            "amount": 1,
 *            "unit": "Teaspoon",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                }
 *            }
 *        },
 *        {
 *            "id": 11215,
 *            "aisle": "Produce",
 *            "image": "garlic.png",
 *            "consistency": "SOLID",
 *            "name": "garlic",
 *            "nameClean": "garlic",
 *            "original": "1 Clove of garlic",
 *            "originalName": "garlic",
 *            "amount": 1,
 *            "unit": "Clove",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "Clove",
 *                    "unitLong": "Clove"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "Clove",
 *                    "unitLong": "Clove"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10014412,
 *            "aisle": "Frozen",
 *            "image": "ice-cubes.png",
 *            "consistency": "SOLID",
 *            "name": "ice cubes",
 *            "nameClean": "ice",
 *            "original": "3 Cubes of Maggi",
 *            "originalName": "Cubes of Maggi",
 *            "amount": 3,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 11282,
 *            "aisle": "Produce",
 *            "image": "brown-onion.png",
 *            "consistency": "SOLID",
 *            "name": "onion",
 *            "nameClean": "onion",
 *            "original": "1 Small bulb of Onion",
 *            "originalName": "Small bulb of Onion",
 *            "amount": 1,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 1002030,
 *            "aisle": "Spices and Seasonings",
 *            "image": "pepper.jpg",
 *            "consistency": "SOLID",
 *            "name": "pepper",
 *            "nameClean": "black pepper",
 *            "original": "1 Teaspoon of dry pepper",
 *            "originalName": "dry pepper",
 *            "amount": 1,
 *            "unit": "Teaspoon",
 *            "meta": [
 *                "dry"
 *            ],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                }
 *            }
 *        },
 *        {
 *            "id": 20444,
 *            "aisle": "Pasta and Rice",
 *            "image": "uncooked-white-rice.png",
 *            "consistency": "SOLID",
 *            "name": "rice",
 *            "nameClean": "rice",
 *            "original": "2 cups of Rice",
 *            "originalName": "Rice",
 *            "amount": 2,
 *            "unit": "cups",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "cups",
 *                    "unitLong": "cups"
 *                },
 *                "metric": {
 *                    "amount": 473.176,
 *                    "unitShort": "ml",
 *                    "unitLong": "milliliters"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10211529,
 *            "aisle": "Produce",
 *            "image": "roma-tomatoes.png",
 *            "consistency": "SOLID",
 *            "name": "roma tomatoes",
 *            "nameClean": "italian tomato",
 *            "original": "7 Medium sized Roma Tomatoes",
 *            "originalName": "Medium sized Roma Tomatoes",
 *            "amount": 7,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 7,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 7,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 2047,
 *            "aisle": "Spices and Seasonings",
 *            "image": "salt.jpg",
 *            "consistency": "SOLID",
 *            "name": "salt",
 *            "nameClean": "table salt",
 *            "original": "2 Teaspoons of Salt",
 *            "originalName": "Salt",
 *            "amount": 2,
 *            "unit": "Teaspoons",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "tsps",
 *                    "unitLong": "teaspoons"
 *                },
 *                "metric": {
 *                    "amount": 2,
 *                    "unitShort": "tsps",
 *                    "unitLong": "teaspoons"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10011819,
 *            "aisle": "Produce;Ethnic Foods",
 *            "image": "scotch-bonnet-chile.jpg",
 *            "consistency": "SOLID",
 *            "name": "scotch bonnet chili peppers",
 *            "nameClean": "habanero chili",
 *            "original": "3 Scotch Bonnet Peppers",
 *            "originalName": "Scotch Bonnet Peppers",
 *            "amount": 3,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 2049,
 *            "aisle": "Produce;Spices and Seasonings",
 *            "image": "thyme.jpg",
 *            "consistency": "SOLID",
 *            "name": "thyme",
 *            "nameClean": "thyme",
 *            "original": "A pinch of Thyme",
 *            "originalName": "A of Thyme",
 *            "amount": 1,
 *            "unit": "pinch",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "pinch",
 *                    "unitLong": "pinch"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "pinch",
 *                    "unitLong": "pinch"
 *                }
 *            }
 *        },
 *        {
 *            "id": 11547,
 *            "aisle": "Canned and Jarred",
 *            "image": "tomato-paste.jpg",
 *            "consistency": "SOLID",
 *            "name": "tomato puree",
 *            "nameClean": "tomato puree",
 *            "original": "1 Small can of Tomato puree",
 *            "originalName": "Small can of Tomato puree",
 *            "amount": 1,
 *            "unit": "",
 *            "meta": [
 *                "canned"
 *            ],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 4513,
 *            "aisle": null,
 *            "image": null,
 *            "consistency": "SOLID",
 *            "name": "vegetable cooking oil",
 *            "nameClean": null,
 *            "original": "2 Cooking spoons of Vegetable Oil",
 *            "originalName": "Cooking spoons of Vegetable Oil",
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
 *        {
 *            "id": 14412,
 *            "aisle": "Beverages",
 *            "image": "water.png",
 *            "consistency": "LIQUID",
 *            "name": "water",
 *            "nameClean": "water",
 *            "original": "3 cups of water",
 *            "originalName": "water",
 *            "amount": 3,
 *            "unit": "cups",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "cups",
 *                    "unitLong": "cups"
 *                },
 *                "metric": {
 *                    "amount": 709.764,
 *                    "unitShort": "ml",
 *                    "unitLong": "milliliters"
 *                }
 *            }
 *        }
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
 *                        {
 *                            "id": 11282,
 *                            "name": "onion",
 *                            "localizedName": "onion",
 *                            "image": "brown-onion.png"
 *                        },
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 14412,
 *                            "name": "water",
 *                            "localizedName": "water",
 *                            "image": "water.png"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        }
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
 *                {
 *                    "number": 3,
 *                    "step": "Pour in the can of tomato puree and fry.",
 *                    "ingredients": [
 *                        {
 *                            "id": 11547,
 *                            "name": "tomato puree",
 *                            "localizedName": "tomato puree",
 *                            "image": "tomato-paste.jpg"
 *                        }
 *                    ],
 *                    "equipment": []
 *                },
 *                {
 *                    "number": 4,
 *                    "step": "Pour in blended tomato and pepper mix into the pot and stir in.",
 *                    "ingredients": [
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 11529,
 *                            "name": "tomato",
 *                            "localizedName": "tomato",
 *                            "image": "tomato.png"
 *                        }
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404752,
 *                            "name": "pot",
 *                            "localizedName": "pot",
 *                            "image": "stock-pot.jpg"
 *                        }
 *                    ]
 *                },
 *                {
 *                    "number": 5,
 *                    "step": "Pour in salt, dry pepper, curry, thyme, bay leaves and maggi cubes.Allow it to simmer on low heat for 3 minutes.Reduce the heat to the lowest level and pour in the washed rice.",
 *                    "ingredients": [
 *                        {
 *                            "id": 2004,
 *                            "name": "bay leaves",
 *                            "localizedName": "bay leaves",
 *                            "image": "bay-leaves.jpg"
 *                        },
 *                        {
 *                            "id": 1002030,
 *                            "name": "pepper",
 *                            "localizedName": "pepper",
 *                            "image": "pepper.jpg"
 *                        },
 *                        {
 *                            "id": 2015,
 *                            "name": "curry powder",
 *                            "localizedName": "curry powder",
 *                            "image": "curry-powder.jpg"
 *                        },
 *                        {
 *                            "id": 2049,
 *                            "name": "thyme",
 *                            "localizedName": "thyme",
 *                            "image": "thyme.jpg"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        },
 *                        {
 *                            "id": 2047,
 *                            "name": "salt",
 *                            "localizedName": "salt",
 *                            "image": "salt.jpg"
 *                        }
 *                    ],
 *                    "equipment": [],
 *                    "length": {
 *                        "number": 3,
 *                        "unit": "minutes"
 *                    }
 *                },
 *                {
 *                    "number": 6,
 *                    "step": "Pour in the water and stir and leave on low heat for 20 minutes or till the rice is soft.Tip: To get the party rice flavor, increase the heat on the rice and burn the bottom of the pot with the pot covered and stir the rice after 3 minutes of burning.Stir the rice and serve with any protein of your choice.  // <![CDATA[(adsbygoogle = window.adsbygoogle || []).push({});// ]]&gt;A video I shared on Instagram recently",
 *                    "ingredients": [
 *                        {
 *                            "id": 14412,
 *                            "name": "water",
 *                            "localizedName": "water",
 *                            "image": "water.png"
 *                        },
 *                        {
 *                            "id": 20444,
 *                            "name": "rice",
 *                            "localizedName": "rice",
 *                            "image": "uncooked-white-rice.png"
 *                        }
 *                    ],
 *                    "equipment": [
 *                        {
 *                            "id": 404752,
 *                            "name": "pot",
 *                            "localizedName": "pot",
 *                            "image": "stock-pot.jpg"
 *                        }
 *                    ],
 *                    "length": {
 *                        "number": 23,
 *                        "unit": "minutes"
 *                    }
 *                }
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
 *        {
 *            "id": 2015,
 *            "aisle": "Spices and Seasonings",
 *            "image": "curry-powder.jpg",
 *            "consistency": "SOLID",
 *            "name": "curry powder",
 *            "nameClean": "curry powder",
 *            "original": "1 Teaspoon of curry powder",
 *            "originalName": "curry powder",
 *            "amount": 1,
 *            "unit": "Teaspoon",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                }
 *            }
 *        },
 *        {
 *            "id": 11215,
 *            "aisle": "Produce",
 *            "image": "garlic.png",
 *            "consistency": "SOLID",
 *            "name": "garlic",
 *            "nameClean": "garlic",
 *            "original": "1 Clove of garlic",
 *            "originalName": "garlic",
 *            "amount": 1,
 *            "unit": "Clove",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "Clove",
 *                    "unitLong": "Clove"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "Clove",
 *                    "unitLong": "Clove"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10014412,
 *            "aisle": "Frozen",
 *            "image": "ice-cubes.png",
 *            "consistency": "SOLID",
 *            "name": "ice cubes",
 *            "nameClean": "ice",
 *            "original": "3 Cubes of Maggi",
 *            "originalName": "Cubes of Maggi",
 *            "amount": 3,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 11282,
 *            "aisle": "Produce",
 *            "image": "brown-onion.png",
 *            "consistency": "SOLID",
 *            "name": "onion",
 *            "nameClean": "onion",
 *            "original": "1 Small bulb of Onion",
 *            "originalName": "Small bulb of Onion",
 *            "amount": 1,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 1002030,
 *            "aisle": "Spices and Seasonings",
 *            "image": "pepper.jpg",
 *            "consistency": "SOLID",
 *            "name": "pepper",
 *            "nameClean": "black pepper",
 *            "original": "1 Teaspoon of dry pepper",
 *            "originalName": "dry pepper",
 *            "amount": 1,
 *            "unit": "Teaspoon",
 *            "meta": [
 *                "dry"
 *            ],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "tsp",
 *                    "unitLong": "teaspoon"
 *                }
 *            }
 *        },
 *        {
 *            "id": 20444,
 *            "aisle": "Pasta and Rice",
 *            "image": "uncooked-white-rice.png",
 *            "consistency": "SOLID",
 *            "name": "rice",
 *            "nameClean": "rice",
 *            "original": "2 cups of Rice",
 *            "originalName": "Rice",
 *            "amount": 2,
 *            "unit": "cups",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "cups",
 *                    "unitLong": "cups"
 *                },
 *                "metric": {
 *                    "amount": 473.176,
 *                    "unitShort": "ml",
 *                    "unitLong": "milliliters"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10211529,
 *            "aisle": "Produce",
 *            "image": "roma-tomatoes.png",
 *            "consistency": "SOLID",
 *            "name": "roma tomatoes",
 *            "nameClean": "italian tomato",
 *            "original": "7 Medium sized Roma Tomatoes",
 *            "originalName": "Medium sized Roma Tomatoes",
 *            "amount": 7,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 7,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 7,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 2047,
 *            "aisle": "Spices and Seasonings",
 *            "image": "salt.jpg",
 *            "consistency": "SOLID",
 *            "name": "salt",
 *            "nameClean": "table salt",
 *            "original": "2 Teaspoons of Salt",
 *            "originalName": "Salt",
 *            "amount": 2,
 *            "unit": "Teaspoons",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 2,
 *                    "unitShort": "tsps",
 *                    "unitLong": "teaspoons"
 *                },
 *                "metric": {
 *                    "amount": 2,
 *                    "unitShort": "tsps",
 *                    "unitLong": "teaspoons"
 *                }
 *            }
 *        },
 *        {
 *            "id": 10011819,
 *            "aisle": "Produce;Ethnic Foods",
 *            "image": "scotch-bonnet-chile.jpg",
 *            "consistency": "SOLID",
 *            "name": "scotch bonnet chili peppers",
 *            "nameClean": "habanero chili",
 *            "original": "3 Scotch Bonnet Peppers",
 *            "originalName": "Scotch Bonnet Peppers",
 *            "amount": 3,
 *            "unit": "",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 3,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 2049,
 *            "aisle": "Produce;Spices and Seasonings",
 *            "image": "thyme.jpg",
 *            "consistency": "SOLID",
 *            "name": "thyme",
 *            "nameClean": "thyme",
 *            "original": "A pinch of Thyme",
 *            "originalName": "A of Thyme",
 *            "amount": 1,
 *            "unit": "pinch",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "pinch",
 *                    "unitLong": "pinch"
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "pinch",
 *                    "unitLong": "pinch"
 *                }
 *            }
 *        },
 *        {
 *            "id": 11547,
 *            "aisle": "Canned and Jarred",
 *            "image": "tomato-paste.jpg",
 *            "consistency": "SOLID",
 *            "name": "tomato puree",
 *            "nameClean": "tomato puree",
 *            "original": "1 Small can of Tomato puree",
 *            "originalName": "Small can of Tomato puree",
 *            "amount": 1,
 *            "unit": "",
 *            "meta": [
 *                "canned"
 *            ],
 *            "measures": {
 *                "us": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                },
 *                "metric": {
 *                    "amount": 1,
 *                    "unitShort": "",
 *                    "unitLong": ""
 *                }
 *            }
 *        },
 *        {
 *            "id": 4513,
 *            "aisle": null,
 *            "image": null,
 *            "consistency": "SOLID",
 *            "name": "vegetable cooking oil",
 *            "nameClean": null,
 *            "original": "2 Cooking spoons of Vegetable Oil",
 *            "originalName": "Cooking spoons of Vegetable Oil",
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
 *        {
 *            "id": 14412,
 *            "aisle": "Beverages",
 *            "image": "water.png",
 *            "consistency": "LIQUID",
 *            "name": "water",
 *            "nameClean": "water",
 *            "original": "3 cups of water",
 *            "originalName": "water",
 *            "amount": 3,
 *            "unit": "cups",
 *            "meta": [],
 *            "measures": {
 *                "us": {
 *                    "amount": 3,
 *                    "unitShort": "cups",
 *                    "unitLong": "cups"
 *                },
 *                "metric": {
 *                    "amount": 709.764,
 *                    "unitShort": "ml",
 *                    "unitLong": "milliliters"
 *                }
 *            }
 *        }
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
