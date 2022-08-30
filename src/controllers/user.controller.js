const { Example } = require("../models/example.model")
const { User } = require("../models/user.model")
const {Spoonacular, jwt_token_secret} = require("../config/spoonacular.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");


async function register(req, res) {
    try {
        // Get user input
        const { firstname, lastname, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstname && lastname)) {
          res.status(400).send("All input is required ! ");
          console.log(req.body)
        }
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(409).send("User Already Exist. Please Login");
        }
    
        //Encrypt user password
        encryptedPassword = await bcrypt.hash(password, 10);
    
        // Create user in our database
        const user = await User.create({
            firstname: firstname,
            lastname: lastname,
            mail: email.toLowerCase(),
            password: encryptedPassword,
        });
    
        // Create token
        const token = jwt.sign(
          { user_id: user._id, email },
          jwt_token_secret,
          {
            expiresIn: "2h",
          }
        );
        // save user token
        user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}

async function getPreferences(req, res){

  res.json({
    "firstname" : "John",
    "lastname" : "Doe",
    "cook" : {
      "allergen" : {"Dairy":"Dairy", "Egg":"Egg", "Sesame":"Sesame"},
      "cookType" : {"African":"African", "American":"American", "British":"British"},
      "particularity" : {"Gluten Free":"Gluten Free", "Ketogenic":"Ketogenic"},
      "duration" : 0,
      "health" : true
    }
  })
}

module.exports = {
    register, getPreferences
}