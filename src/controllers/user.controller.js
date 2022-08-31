const { Example } = require("../models/example.model")
const { User } = require("../models/user.model")
const {Spoonacular} = require("../config/spoonacular.config")
const {jwt_token_secret} = require("../config/auth.config")
const { validationResult } = require("express-validator")
const {CREATED, OK, BAD_REQUEST, NOT_FOUND, CONFLICT} = require("http-status")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { userExample } = require("../config/user.example.config")
const { NOT_EXTENDED } = require("http-status")
const {verifyToken} = require("./auth.controller")


async function register(req, res) {
    try {
        // Get user input
        const { firstname, lastname, email, password } = req.body;
    
        // Validate user input
        if (!(email && password && firstname && lastname)) {
          res.status(BAD_REQUEST).send("All input is required ! ").end();
          console.log(req.body)
        }
        
    
        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await User.findOne({ email });
    
        if (oldUser) {
          return res.status(CONFLICT).send("User Already Exist. Please Login").end();
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
    
        // return new user
        res.status(CREATED).json(user);
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
      res.status(BAD_REQUEST).send("All input is required").end();
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

      // user
      res.cookie('token', token)
      res.status(OK).json(user);
    }
    res.status(BAD_REQUEST).send("Invalid Credentials").end();
  } catch (err) {
    console.log(err);
  }
};

async function logout(req, res) {

  //delete cookies
  res.clearCookie("token");
  res.end();

}



async function getPreferences(req, res){

    let idCurrentUser = getCurrentUserIdConnected(req);

    let connectedUser = await User.findById(idCurrentUser);

    if(!connectedUser){res.status(NOT_FOUND).send("User not found ! ").end();return;}

   res.json({
      "firstname" : connectedUser.get('firstname'),
      "lastname"  : connectedUser.get('lastname'),
      "preferences": connectedUser.get('preferences'),

    }).status(OK).end();

}

async function setPreferences(req, res){

    let idCurrentUser = getCurrentUserIdConnected(req);
    let connectedUser = await User.findById(idCurrentUser);
    if(!connectedUser){res.status(NOT_FOUND).send("User not found ! ").end();return;}

    let newPreferences = req.body.preferences;
    if(!newPreferences){res.status(BAD_REQUEST).send("No preferences given! ").end(); return;}

    connectedUser.set({preferences:newPreferences});
    await connectedUser.save();

    res.status(OK).send("Preferences updated !").end();

}


function getCurrentUserIdConnected(req ){

  verifyToken;

  let token = req.headers.authorization

  if (!token) {return null}
  token = token.split(' ')[1];

    const decodedToken = jwt.decode(token, {
      complete: true
     });
    
     if (!decodedToken) {return null}
    
     return decodedToken.payload.user_id;

}

module.exports = {
    register, getPreferences, setPreferences, login, logout
}