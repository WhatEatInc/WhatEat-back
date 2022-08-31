const { Example } = require("../models/example.model")
const { User } = require("../models/user.model")
const {Spoonacular} = require("../config/spoonacular.config")
const {jwt_token_secret} = require("../config/auth.config")
const { validationResult } = require("express-validator")
const httpStatus = require("http-status")
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const { userExample } = require("../config/user.example.config")
const { NOT_EXTENDED } = require("http-status")


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

      // user
      res.cookie('token', token)
      res.status(200).json(user);
    }
    res.status(400).send("Invalid Credentials");
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

res.json({
  "firstname" : userExample.get('firstname'),
  "lastname"  : userExample.get('lastname'),
  "preferences": userExample.get('preferences'),

})
}

async function setPreferences(req, res){

    let newPreferences = req.body.preferences;
    if(!newPreferences){res.json({"status":"no preferences given"}); return;}

    let idCurrentUser = getCurrentUserIdConnected(req);

    let connectedUser = await User.findById(idCurrentUser);

    if(!connectedUser){res.json({"status":"no user Found"}); return;}

    connectedUser.set({preferences:newPreferences});
    await connectedUser.save();

    res.json({"Status":"ok !"});
    res.end()

}


function getCurrentUserIdConnected(req ){

  const token = req.cookies['token'];

  if (!token) {return null}

    const decodedToken = jwt.decode(token, {
      complete: true
     });
    
     if (!decodedToken) {return null}
    
     return decodedToken.payload.user_id;

}

module.exports = {
    register, getPreferences, setPreferences, login, logout
}