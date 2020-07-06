const wiki = require("wikijs").default


const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");

const igdb = require('igdb-api-node').default;

const axios = require('axios');
const { response } = require("express");

const client = igdb('18cd0fe5d2781aaa3c13611e304dc2cd');

router.get("/getgame", async (req, res) => {
    // try {

        const gameName = req.query.gamename;


        
        const RAWGresponse = await axios.get('https://api.rawg.io/api/games?search=' + gameName)


        var responseArr =[]


        var maxLength = 3
        if(RAWGresponse.data.results.length < 3){
            maxLength = RAWGresponse.data.results.length
        } 


        for(i = 0; i< maxLength; i++){
            var responsegamename = RAWGresponse.data.results[i].name

            console.log(responsegamename)


            var url = ""

            try{
                await wiki().page(responsegamename).then( page => page.mainImage() ).then(res=>{
                    url = res;
                    console.log(res)
                });
            } catch(e){
                console.log("error retriving image" + e)
            }
      


            responseArr.push(
                [
                    responsegamename, url
                ]
            );
    
        }


        console.log(responseArr)



       

 
        
  

        res.json(responseArr)

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
