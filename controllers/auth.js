// //
// const express = require("express");
// //create routes using the  express content 
// const router = express.Router();

// const User = require('../models/user');

// const authConfig= require('../config/auth');


// // to berdge the two pages make link with the server.js 
// router.get('/sign-up' , async (req , res)=>{
//     res.render('auth/sign-up.ejs');
// });

// //
// router.post("/sign-up", async (req, res) => {
//     //grap the value from the req.body
//     const username = req.body.username;
//     const password = req.body.password;
//     const confirmPassword = req.body.confirmPassword;
//     const existingUser = await User.findOne({username});

//     // check if the user already exist if it is exist send message to the browser 
//     if (existingUser) {
//         return res.send("username is taken");
//     }
//     //verfiy the passwrods match
//     if (password != confirmPassword) {
//         return res.send("password don't match")
//     }
//     //--b make the password secured
//     const hashPassword = auth.encryptPassword(password);

//     //create the user in the databse 
//     const payLoad = {username, password:hashPassword};
//     const newUser = await User.create(payLoad);

//     //resposnd back to the client
//     // res.send("Form submission accepted!");
//     res.send(`Thanks for signing up ${newUser.username}`);

//   });
// module.exports = router;

/* eslint-disable prefer-destructuring */
const express = require('express');
const User = require('../models/user');
const auth = require('../config/auth');

const router = express.Router();

router.get('/sign-up', async (req, res) => {
  res.render('auth/sign-up.ejs');
});

router.post('/sign-up', async (req, res) => {
  // grab the values from the req body
  const username = req.body.username;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  // Check if the user already exists
  const existingUser = await User.findOne({ username });

  // if the user exists,then dont bother doing anything, just send a message to the browser
  if (existingUser) {
    return res.send('Username is taken');
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

module.exports = router;