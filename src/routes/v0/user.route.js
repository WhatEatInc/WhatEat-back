const express = require("express");
const userRouter = express.Router();
const userController = require("../../controllers/user.controller");
const { body } = require("express-validator");
const verifyToken = require("../../controllers/auth.controller");

userRouter.post("/welcome", verifyToken, (req, res) => {
  res.status(200).send("Welcome 🙌 ");
});

/**
 * @api {post} /user/register Register a new user
 * @apiName register
 * @apiGroup User
 *
 * @apiParamExample {json} Request-Example:
 * {
 *  "firstname" : "John",
 *  "lastname" : "Doe",
 *  "email" : "john@doe.ch",
 *  "password": "123StrongPass"
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 201 CREATED
 *  {
 *     "firstname": "John",
 *     "lastname": "Doe",
 *     "email": "john@doe.ch",
 *     "password": "$2a$10$mk3y8JntxLuyx39arSQ5L.eueHDhuFem2sOTBfEoKlCOoL9bxFo4C",
 *     "_id": "630f3a9593ad31d8f4623abc",
 *     "__v": 0
 * }
 */
userRouter.post("/register", userController.register);

/**
 * @api {post} /user/login Login a user
 * @apiName login
 * @apiGroup User
 *
 * @apiParamExample {json} Request-Example:
 * {
 *     "email" : "john@doe.ch",
 *     "password" : "123StrongPass"
 * 
 * }
 *
 * @apiSuccessExample {json} Success-Response:
 *      HTTP/1.1 200 OK
 *       {
 *          "_id": "630e04dd733aee22ce6d6d04",
 *          "firstname": "damaino",
 *          "lastname": "frontend",
 *          "email": "damaino@frontend.ch",
 *          "password": "$2a$10$ll6L3hVeZG5KvW94U1974OLPpg6.SyXWuGAkF5JHP4LwS/0FwiAlS",
 *          "preferences": {
 *              "allergens": {
 *                  "Wheat": "Wheat"
 *              },
 *              "particularities": {
 *                  "Vegan": "Vegan"
 *              },
 *              "cookTypes": {
 *                  "French": "French",
 *                  "Spanish": "Spanish"
 *              },
 *              "healthy": true,
 *              "duration": 1,
 *              "_id": "630f171bb6ee2246b7d6b1a4"
 *          },
 *          "__v": 0
 *       }

 */
userRouter.post("/login", userController.login);

/**
 * @api {post} /user/logout Logout a user
 * @apiName logout
 * @apiGroup User
 *
 * @apiSuccess {String} user-logged-out   HTTP 200 User logged out
 */
userRouter.post("/logout", verifyToken, userController.logout);

/**
 * @api {get} /user/getPreferences Get preferences of the current logged user
 * @apiName getPreferences
 * @apiGroup User
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *    "firstname": "John",
 *    "lastname": "Doe",
 *    "preferences": {
 *        "allergens": {
 *            "Wheat": "Wheat"
 *        },
 *        "particularities": {
 *            "Vegan": "Vegan"
 *        },
 *        "cookTypes": {
 *            "French": "French",
 *            "Spanish": "Spanish"
 *        },
 *        "healthy": true,
 *        "duration": 1,
 *        "_id": "630f171bb6ee2246b7d6b1a6"
 *    }
 *}
 */
userRouter.get("/getPreferences", verifyToken, userController.getPreferences);

/**
 * @api {post} /user/setPreferences Set preferences of the current logged user
 * @apiName setPreferences
 * @apiGroup User
 *
 * @apiParamExample {json} Request-Example:
 *  {
 *     "preferences": {
 *         "allergens": {
 *             "Dairy": "Dairy",
 *             "Egg": "Egg",
 *             "Wheat": "Wheat"
 *         },
 *         "particularities": {
 *             "Gluten Free": "Gluten Free"
 *         },
 *         "cookTypes": {
 *             "African": "African",
 *             "American": "American"
 *         },
 *         "healthy": true,
 *         "duration": 1,
 *         "_id": "630f171bb6ee2246b7d6b1a4"
 *     }
 * }
 *
 *
 * @apiSuccess {String} Preferences-updated   HTTP 200 OK Preferences updated !
 */
userRouter.post("/setPreferences", verifyToken, userController.setPreferences);

userRouter.post("/changePassword", verifyToken, userController.changePassword);

module.exports = userRouter;
