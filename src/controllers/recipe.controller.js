const { Example } = require("../models/example.model")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const spoonacular = require("../config/spoonacular.config")
const superagent = require('superagent');

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



// This function parses the JSON result of the API
// returns only useful attributes
function removeUselessAttr(results) {

    //delete useless attributes of each recipes retrieved 
    for (recipe of results.recipes) {
      for (attr of uselessAttributes) { delete recipe[attr] }
  
    }
  
    return results;
  }

module.exports = {
    get, post
}