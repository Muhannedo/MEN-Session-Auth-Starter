//
const express = require("express");
//create routes using the  express content 
const router = express.Router();

const User = require('../models/user');

// to berdge the two pages make link with the server.js 
router.get('/sign-up' , async (req , res)=>{
    res.render('auth/sign-up.ejs');
});

//
router.post("/sign-up", async (req, res) => {
    //grap the value from the req.body
    const username = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const existingUser = User.findOne({username});

    // check if the user already exist if it is exist send message to the browser 
    if (existingUser) {
        return res.send("username is taken")
    }
    //verfiy the passwrods match
    //create the user in the databse 
    //--b make the password secured
    //resposnd back to the client
    res.send("Form submission accepted!");
  });
module.exports = router;