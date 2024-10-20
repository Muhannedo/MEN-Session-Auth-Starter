/* eslint-disable prefer-destructuring */
const express = require("express");
const User = require("../models/user");
const auth = require("../config/auth");

const router = express.Router();
// sign up
router.get("/sign-up", async (req, res) => {
  res.render("auth/sign-up.ejs");
});

router.post("/sign-up", async (req, res) => {
  // grab the values from the req body
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // Check if the user already exists
  const existingUser = await User.findOne({ username });

  // if the user exists,then dont bother doing anything, just send a message to the browser
  if (existingUser) {
    return res.send("Username is taken");
  }
  // verify that the password matches
  if (password !== confirmPassword) {
    return res.send("Passwords don't match!");
  }

  // create the user in the database
  // -b make the password secure
  const hashPassword = auth.encryptPassword(password);
  const payload = { username, password: hashPassword };

  const newUser = await User.create(payload);
  // respond back to the browser
  res.send(`Thanks for signing up ${newUser.username}`);
});

// sign IN
router.get("/sign-in", (req, res) => {
  res.render("auth/sign-in.ejs");
});

router.post("/sign-in", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.findOne({ username });
  //find the user from the user name

  // if the user not exist send an error msg
  if (!user) {
    return res.send("login failed , please try again");
  }

  // compare the password submitted with the one in the databse
  const validPassword = auth.comparedPassword(password, user.password);
  if (!validPassword) {
    return res.send("login failed , please try again");
  }

  //if the password no good then send a error message
  //create a session cookie
  req.session.user = {
    username: user.username,
  };
  
  res.redirect('/');
  
});

module.exports = router;
