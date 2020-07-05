const wiki = require("wikijs").default


const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");

router.get("/getgame", async (req, res) => {
    try {

        const gameName = req.gamename;


 
        



        res.send({message: "test"})

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });


router.get("/test", async (req, res) => {
    wiki().page('bioshock').then( page => page.mainImage() ).then(console.log);
    try {
  
    
      res.send({message: "test"})

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
