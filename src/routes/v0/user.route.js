const express = require("express")
const userRouter = express.Router()
const userController = require("../../controllers/user.controller")
const { body } = require("express-validator")


userRouter.post(
    '/register',
    userController.register
)

module.exports = userRouter;