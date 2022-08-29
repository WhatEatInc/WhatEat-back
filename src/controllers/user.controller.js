const { Example } = require("../models/example.model")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")


async function register(req, res) {
    res.json({
        "yesyes": "yoyoyo"
    })
}

module.exports = {
    register
}