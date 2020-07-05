const wiki = require("wikijs").default


const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");

const igdb = require('igdb-api-node').default;

const client = igdb('18cd0fe5d2781aaa3c13611e304dc2cd');

router.get("/getgame", async (req, res) => {
    // try {

        const gameName = req.query.gamename;


        
     




        var url = ""

 
        
        await wiki().page(gameName).then( page => page.mainImage() ).then(res=>{
            url = res;
            console.log(res)
        });


        res.json(url)

    // } catch (e) {
    //   res.send({ message: "Error in Fetching user" + e});
    // }
  });


router.get("/test", async (req, res) => {
    try {
  
    
      res.send({message: "test"})

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
