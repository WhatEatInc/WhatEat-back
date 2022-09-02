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
userRouter.post("/register",
                body("firstname").trim().not().isEmpty({ ignore_whitespace: true }),
                body("lastname").trim().not().isEmpty({ ignore_whitespace: true }),
                body("email").isEmail(),
                body("password").isStrongPassword(),
                userController.register);

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
userRouter.post("/login",
                body("email").trim().not().isEmpty({ ignore_whitespace: true }),
                body("password").trim().not().isEmpty({ ignore_whitespace: true }),
                userController.login);

/**
 * @api {post} /user/logout Logout a user
 * @apiName logout
 * @apiGroup User
 *
 * @apiSuccess {String} user-logged-out   HTTP 200 User logged out
 */
userRouter.post("/logout", verifyToken, userController.logout);

/**
 * @api {get} /user/getPreferences Get user's preferences
 * @apiName getPreferences
 * @apiGroup User
 *
 * @apiDescription Get preferences of the current logged user
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
 * @api {post} /user/setPreferences Set user's preferences 
 * @apiName setPreferences
 * @apiGroup User
 *
 * @apiDescription Set preferences of the current logged user
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
userRouter.post("/setPreferences", verifyToken, body('preferences').not().isEmpty() ,userController.setPreferences);

/**
 * @api {post} /user/changePassword Change password
 * @apiName setPreferences
 * @apiGroup User
 * 
 * @apiDescription Change the current user's password with a new password.
 *
 * @apiParamExample {json} Request-Example:
 *                  {"currentPWD" : "123",
 *                   "newPWD" : "456"
 *                  }
 * 
 * @apiSuccess {String} password-updated   HTTP 200 OK Password updated !
*          
 */
userRouter.post("/changePassword", verifyToken, body('currentPWD').not().isEmpty(), body('newPWD').isStrongPassword(), userController.changePassword);

module.exports = userRouter;
