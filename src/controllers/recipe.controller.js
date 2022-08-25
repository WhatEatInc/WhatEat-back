const { Example } = require("../models/example.model")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const spoonacular = require("../config/spoonacular.config")

async function get(req, res) {
    res.json({
        "title": "pasta carbo",
   
       
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
    get, post
}