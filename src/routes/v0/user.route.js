const express = require("express")
const userRouter = express.Router()
const userController = require("../../controllers/user.controller")
const { body } = require("express-validator")
const verifyToken = require("../../controllers/auth.controller")


/**
 * @api {post} /user/register Register a new user
 * @apiName register
 * @apiGroup User
 *
 * @apiParam {String} firstname Firstname of the user
 * @apiParam {String} lastname  Lastname of the user
 * @apiParam {String} email     Email of the user
 * @apiParam {String} password  password of the user
 *
 * @apiSuccess {String} firstname   Firstname of the User.
 * @apiSuccess {String} lastname    Lastname of the User.
 * @apiSuccess {String} mail        Email of the User.
 * @apiSuccess {String} password    hashed password of the User.
 * @apiSuccess {Array}  preferences Preferences of the User.
 * @apiSuccess {String} token       jwt token used to auth user
 */


 userRouter.post("/welcome", verifyToken, (req, res) => {
    res.status(200).send("Welcome 🙌 ");
  });

userRouter.post(
    '/register',
    userController.register
)



/**
 * @api {post} /user/login Login a user
 * @apiName login
 * @apiGroup User
 *
 * @apiParam {String} email Email of the user
 * @apiParam {String} password Password of the user
 *
 * @apiSuccess {String} firstname   Firstname of the User.
 * @apiSuccess {String} lastname    Lastname of the User.
 * @apiSuccess {String} mail        Email of the User.
 * @apiSuccess {String} password    hashed password of the User.
 * @apiSuccess {Array}  preferences Preferences of the User.
 * @apiSuccess {String} token       jwt token used to auth user
 */
userRouter.post(
    '/login',
    userController.login
)

module.exports = userRouter;
