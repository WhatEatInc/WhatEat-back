allergen = [ "Dairy", "Egg", "Sesame", "Sulfite", "Gluten", 
              "Grain", "Shellfish", "Tree Nut", "Peanut", "Seafood", 
              "Soy", "Wheat" ];

particularity = ["Gluten Free", "Ketogenic", "Vegan", 
                 "Vegetarien", "Pescetarian", "Paleo" ];

cookType = ["African", "American", "British", "Irish", "Korean", "Middle Eastern",
            "Thai", "Cajun", "Caribbean", "Chinese", "Italian", "Latin American", "Nordic",
            "Vietnamese", "Eastern European", "European", "French", "Japanase", "Mediterranean",
            "Southern", "German", "Greek", "Indian", "Jewish", "Mexican", "Spanish" ];

duration =  {"0" : "Short",
            "1" : "Medium",
            "2" : "Long"};


module.exports = {
    allergen: allergen,
    particularity : particularity,
    cookType: cookType,
    duration : duration
    }