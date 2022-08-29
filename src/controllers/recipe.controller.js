const { Example } = require("../models/example.model")
const { Allergens, Particularity, CookType, Duration  } = require("../config/spoonacular.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")

async function get(req, res) {
    res.json({
        "title": "pasta carbo"
    })
}

async function getAllergen(req, res){

    res.json({
        "Allergen" : allergen
    })
}

async function getCookType(req, res){

    res.json({
        "CookType" : cookType
    })
}

async function getParticularity(req, res){

    res.json({
        "Particularity" : particularity
    })
}

async function getDuration(req, res){

    res.json({
        "Duration" : duration
    })
}

async function post(req, res) {
    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        res.status(httpStatus.BAD_REQUEST).json({errors: errors.array()})
        return
    }

    const example = new Example({
        hello: req.body.hello, 
        world: req.body.world
    })

    example.save()
    .then(example => {
        res.status(httpStatus.CREATED).json(example)
    })
    .catch(err => {
        res.status(httpStatus.INTERNAL_SERVER_ERROR).json(err)
    })
    
    return
}

module.exports = {
    get, post, getAllergen, getCookType, getParticularity, getDuration
}