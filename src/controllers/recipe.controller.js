const { Example } = require("../models/example.model")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const superagent = require('superagent');
const { apiKey, uselessAttributes } = require("../config/spoonacular.config");
const {allergens, particularities, cookTypes, duration} = require("../config/user-preferences.config");


async function get(req, res) {
    try {
        const apiRes = await getRandomRecipe();
        let finalRecipe = removeUselessAttr(apiRes.body);
  
        // throw smth
        //throw 'Artificial error.';
  
        res.json(finalRecipe)
  
    } catch (error) {

        res.json({
            "error": error,

        })
    }
}

async function getAllergens(req, res){

    res.json({
        "allergens" : allergens
    })
}

async function getCookTypes(req, res){

    res.json({
        "cookTypes" : cookTypes
    })
}

async function getParticularities(req, res){

    res.json({
        "particularities" : particularities
    })
}

async function getDuration(req, res){

    res.json({
        "duration" : duration
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



// This function parses the JSON result of spoonacular
// returns only useful attributes
function removeUselessAttr(results) {

    //delete useless attributes of each recipes retrieved 
    for (recipe of results.recipes) {
      for (attr of uselessAttributes) { delete recipe[attr] }
  
    }
  
    return results;
  }

  function getRandomRecipe() { 
    return new Promise((resolve, reject) => {
        return superagent
            .get('https://api.spoonacular.com/recipes/random')
            .query({ apiKey: apiKey, number: '1' })
            .accept('json')
            .end((err, res) => {
                if(!err) {
                    // throw smth
                    // reject('Bonus error.');
                    resolve(res);
                } else {
                    console.log('error present', err);
                    reject(err);
                }
            });
    });
  }
  

module.exports = {
    get, post, getAllergens, getCookTypes, getParticularities, getDuration
}