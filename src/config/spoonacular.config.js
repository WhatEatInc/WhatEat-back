require("dotenv").config()

const uselessAttributes = ['creditsText', 'license', 'sourceName', 'sourceUrl',
  'originalId', 'veryPopular', 'gaps', 'spoonacularSourceUrl', 'sustainable'];


const allergen = { "Dairy":"Dairy", "Egg":"Egg", "Sesame":"Sesame", "Sulfite":"Sulfite", "Gluten":"Gluten", 
              "Grain":"Grain", "Shellfish":"Shellfish", "Tree Nut":"Tree Nut", "Peanut":"Peanut", "Seafood":"Seafood", 
              "Soy":"Soy", "Wheat":"Wheat" };

const particularity = {"Gluten Free":"Gluten Free", "Ketogenic":"Ketogenic", "Vegan":"Vegan", 
                 "Vegetarien":"Vegetarien", "Pescetarian":"Pescetarian", "Paleo":"Paleo" };

const cookType = {"African":"African", "American":"American", "British":"British", "Irish":"Irish", "Korean":"Korean", "Middle Eastern":"Middle Eastern",
            "Thai": "Thai", "Cajun":"Cajun", "Caribbean":"Caribbean", "Chinese":"Chinese", "Italian":"Italian", "Latin American":"Latin American", "Nordic":"Nordic",
            "Vietnamese":"Vietnamese", "Eastern European":"Eastern European", "European":"European", "French":"French", "Japanase":"Japanase", "Mediterranean":"Mediterranean",
            "Southern":"Southern", "German":"German", "Greek":"Greek", "Indian":"Indian", "Jewish":"Jewish", "Mexican":"Mexican", "Spanish":"Spanish" };

const duration =  {"0" : "Short",
            "1" : "Medium",
            "2" : "Long"};

module.exports = {
    apiKey: process.env.SPOONACULAR_API_KEY,
    uselessAttributes: uselessAttributes, 
    allergen: allergen,
    particularity : particularity,
    cookType: cookType,
    duration : duration
}
