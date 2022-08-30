const { Example } = require("../models/example.model")
const { User } = require("../models/user.model")
const {Spoonacular} = require("../config/spoonacular.config")
const {jwt_token_secret} = require("../config/auth.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { userExample } = require("../config/user.example.config")


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
            email: email.toLowerCase(),
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
        // user.token = token;
    
        // return new user
        res.status(201).json(user);
      } catch (err) {
        console.log(err);
      }
}



async function login(req, res) {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      res.status(400).send("All input is required");
    }
    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        jwt_token_secret,
        {
          expiresIn: "2h",
        }
      );

      // save user token
      //user.token = token;

      // user
      res.cookie('token', token)
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
};



async function getPreferences(req, res){

 console.log(userExample.get('preferences'));

res.json({
  "firstname" : userExample.get('firstname'),
  "lastname"  : userExample.get('lastname'),
  "preferences": userExample.get('preferences'),

})
}

module.exports = {
    register, getPreferences, login
}