require("dotenv").config()

const uselessAttributes = ['creditsText', 'license', 'sourceName', 'sourceUrl',
  'originalId', 'veryPopular', 'gaps', 'spoonacularSourceUrl',
  'sustainable']

module.exports = {
    apiKey: process.env.SPOONACULAR_API_KEY,
    uselessAttributes: uselessAttributes

}