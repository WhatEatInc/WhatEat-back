const { User } = require("../models/user.model");
const { jwt_token_secret } = require("../config/auth.config");
const { validationResult } = require("express-validator");
const {
  CREATED,
  OK,
  BAD_REQUEST,
  CONFLICT,
} = require("http-status");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Preference } = require("../models/preference.model");

async function register(req, res) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(BAD_REQUEST).json({ errors: errors.array() }).end();
    return;
  
  }

  try {
    // Get user input
    const { firstname, lastname, email, password } = req.body;

    // check if user already exist
    // Validate if user exist in our database
    const oldUser = await User.findOne({ email });

    if (oldUser) {
       res
        .status(CONFLICT)
        .json({error: "User Already Exist. Please Login"})
        .end();
        return;
    }

    //Encrypt user password
    encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      firstname: firstname,
      lastname: lastname,
      email: email.toLowerCase(),
      password: encryptedPassword,
      preferences: new Preference(),
      recipeDate: 0,
      recipe: "",
    });

    // Create token
    const token =  jwt.sign({ user_id: user._id, email }, jwt_token_secret, {
      expiresIn: "2h",
    });

    // return new user
     res.status(CREATED).end();
  } catch (err) {
     res.status(BAD_REQUEST).json({
      error : err
    }).end();
    return
  }
  return
}

async function login(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  try {
    // Get user input
    const { email, password } = req.body;

    // Validate if user exist in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user._id, email }, jwt_token_secret, {
        expiresIn: "2h",
      });

      // user
      user.token = token;
      res.status(OK).json({
        token: user.token
      })
      .end();
      return;
    }

    res
      .status(BAD_REQUEST)
      .json({ error: "Invalid Credentials" }).end();
      return;

  } catch (err) {
    res
      .status(BAD_REQUEST)
      .json({ error: err}).end();
      return;
  }
}

async function logout(req, res) {
  //Frontend needs to manage logout !
  res.status(OK).end();
}

async function getPreferences(req, res) {
 
  const connectedUser =  await getCurrentUser(req,res);

  res
    .json({
      firstname: connectedUser.get("firstname"),
      lastname: connectedUser.get("lastname"),
      preferences: connectedUser.get("preferences"),
    })
    .status(OK)
    .end();
}

async function setPreferences(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  let connectedUser =  await getCurrentUser(req,res);
 

  let newPreferences = req.body.preferences;
  if (!newPreferences) {
    res
      .status(BAD_REQUEST)
      .json({ error: "No preferences given!" })
      .end();
    return;
  }

  connectedUser.set({ preferences: newPreferences });
  await connectedUser.save();

  res.status(OK).end();
}

async function changePassword(req, res) {

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    res.status(BAD_REQUEST).json({ errors: errors.array() });
    return;
  }

  try {

    let connectedUser =  await getCurrentUser(req,res);

    const { currentPWD, newPWD } = req.body;

    if (bcrypt.compare(currentPWD, connectedUser.password)) {
      encryptedPassword = await bcrypt.hash(newPWD, 10);

      connectedUser.password = encryptedPassword;
      connectedUser.save();

      res.status(OK).json({token : connectedUser.token}).end();
      return

    }

    res
      .status(BAD_REQUEST)
      .json({ error: "Password not changed" })
      .end()
      return

    
  } catch (err) {
    console.log(err);
  }
}

/** returns the user currently connected (based on JWT presence) */
async function getCurrentUser(req, res) {

  let connectedUser = null;

  try {

  let token = req.headers.authorization;

  token = token.split(" ")[1];

  const decodedToken = jwt.decode(token, {
    complete: true,
  });

  const userId = decodedToken.payload.user_id;

  connectedUser = await User.findById(userId);

} catch (err) {
  res
    .status(BAD_REQUEST)
    .json({
      error: "Can't find which user is connected ! "
    }).end();

}

return connectedUser;
  

}

module.exports = {
  register,
  getPreferences,
  setPreferences,
  login,
  logout,
  changePassword,
  getCurrentUser
};
