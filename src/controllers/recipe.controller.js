const { Example } = require("../models/example.model")
const { allergen, particularity, cookType, duration  } = require("../config/spoonacular.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const spoonacular = require("../config/spoonacular.config")
const superagent = require('superagent');
const { apiKey } = require("../config/spoonacular.config");

const puppeteer = require('puppeteer');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs');

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
  
 async function download(req, res) {



  const browser = await puppeteer.launch();

  const page = await browser.newPage();

  const pageContent = await ejs.renderFile(path.join(__dirname, '../templates/download.ejs'), {name: 'justttt'})

  await page.goto(`data:text/html,${pageContent}`, { waitUntil: 'networkidle0' });

  const pdf = await page.pdf({
    path: 'result2.pdf',
    margin: { top: '100px', right: '50px', bottom: '100px', left: '50px' },
    printBackground: true,
    format: 'A4',
  });

  // Close the browser instance
  await browser.close();

  res.set('Content-Type', 'application/pdf')
  res.set('Content-Disposition', 'attachement; filename=recipe.pdf')
  res.send(pdf)
}

module.exports = {
    get, post, getAllergen, getCookType, getParticularity, getDuration, download
}