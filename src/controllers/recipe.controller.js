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
            .get('http://my-json-server.typicode.com/WhatEatInc/fakeSpoonApi/db')
            .query({ apiKey: APIKEY, number: '1' })
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
  
  
  async function doSomething() {
    try {
        const res = await getRandomRecipe();
  
        // throw smth
        // throw 'Artificial error.';
  
        console.log(res.body);
  
    } catch (error) {
        throw new Error(`Problem doing something: ${error}.`);
    }
  }

module.exports = {
    get, post
}