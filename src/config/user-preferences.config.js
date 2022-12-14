require("dotenv").config();

const allergens = {
  Dairy: "Dairy",
  Egg: "Egg",
  Sesame: "Sesame",
  Sulfite: "Sulfite",
  Gluten: "Gluten",
  Grain: "Grain",
  Shellfish: "Shellfish",
  "Tree Nut": "Tree Nut",
  Peanut: "Peanut",
  Seafood: "Seafood",
  Soy: "Soy",
  Wheat: "Wheat",
};

const particularities = {
  "Gluten Free": "gluten free",
  Ketogenic: "ketogenic",
  Vegan: "vegan",
  Vegetarien: "vegetarien",
  Pescetarian: "pescetarian",
  Paleo: "paleo",
};

const cookTypes = {
  African: "African",
  American: "American",
  British: "British",
  Irish: "Irish",
  Korean: "Korean",
  "Middle Eastern": "Middle Eastern",
  Thai: "Thai",
  Cajun: "Cajun",
  Caribbean: "Caribbean",
  Chinese: "Chinese",
  Italian: "Italian",
  "Latin American": "Latin American",
  Nordic: "Nordic",
  Vietnamese: "Vietnamese",
  "Eastern European": "Eastern European",
  European: "European",
  French: "French",
  Japanase: "Japanase",
  Mediterranean: "Mediterranean",
  Southern: "Southern",
  German: "German",
  Greek: "Greek",
  Indian: "Indian",
  Jewish: "Jewish",
  Mexican: "Mexican",
  Spanish: "Spanish",
};

const duration = { 0: "Short", 1: "Medium", 2: "Long" };

const durationMapToTime = {"Short": 20, "Medium": 50, "Long":10000}

module.exports = {
  allergens: allergens,
  particularities: particularities,
  cookTypes: cookTypes,
  duration: duration,
  durationMapToTime: durationMapToTime
};
