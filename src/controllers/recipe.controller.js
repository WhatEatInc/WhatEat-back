const { Example } = require("../models/example.model")
const { Allergens, Particularity, CookType, Duration  } = require("../config/spoonacular.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const spoonacular = require("../config/spoonacular.config")
const superagent = require('superagent');
const { apiKey } = require("../config/spoonacular.config");

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



// This function parses the JSON result of spoonacular
// returns only useful attributes
function removeUselessAttr(results) {

    const uselessAttributes = ['creditsText', 'license', 'sourceName', 'sourceUrl',
                                'originalId', 'veryPopular', 'gaps', 'spoonacularSourceUrl',
                                'sustainable'];

    //delete useless attributes of each recipes retrieved 
    for (recipe of results.recipes) {
      for (attr of uselessAttributes) { delete recipe[attr] }
  
    }
  
    return results;
  }

  function getRandomRecipe() {
    return new Promise((resolve, reject) => {
        return superagent
            .get('http://my-json-server.typicode.com/WhatEatInc/fakeSpoonApi/db')
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
    get, post, getAllergen, getCookType, getParticularity, getDuration
}