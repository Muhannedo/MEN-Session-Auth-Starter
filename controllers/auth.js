//
const express = require("express");
//create routes using the  express content 
const router = express.Router();
// to berdge the two pages make link with the server.js 

router.get('/sign-up' , async (req , res)=>{
    res.render('auth/sign-up.ejs');
})
module.exports = router;