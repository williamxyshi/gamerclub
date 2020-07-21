const wiki = require("wikijs").default


const express = require("express");
const { check, validationResult} = require("express-validator/check");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();

const auth = require("./../middleware/auth");

const User = require("../models/user_model");
const Club = require("../models/gamer_club_model");
const Post = require("../models/post_model");
const Comment = require("../models/comment_model");



const igdb = require('igdb-api-node').default;

const axios = require('axios');
const { response } = require("express");

const client = igdb('18cd0fe5d2781aaa3c13611e304dc2cd');

/**
 * get game endpoint api 
 * 
 * returns 3 games and their images
 */
router.get("/getgame", async (req, res) => {
    try {
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
            responseArr.push([responsegamename, url]
            );  
        }
        console.log(responseArr)
        res.json(responseArr)

    } catch (e) {
      res.send({ message: "Game Could Not Be Retrieved"});
    }
  });

/**
 * join club with members
 */
router.post("/joinclub", auth, async(req,res) => {
    try {

        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();
        let date = year + "-" + month + "-" + day

        const user = await User.findById(req.user.id);

        console.log(user)

        const {
            id
        } = req.body;

        let club = await Club.findOne({
            id
        });

        if (!club) {
            return res.status(400).json({
                msg: "Invalid Club ID"
            });
        }

          /**
         * Check if already part of club
         */

        console.log("club found: " + club);

        let member = {
            email: user.email,
            isadmin: false,
            username: user.username

        }

        //add to clubs member list

        //add club to users club list

        //make post about new user joining club

        






        
        res.json(club)

    } catch (e) {

      res.send({ message: "Could Not Join Club"});

    }
})

/**
 * inialize club api endpoint
 * 
 * initializes with a initial announcement post as well.
 */
router.post("/createclub", auth, async (req, res) => {
    try {

        const {
            clubname,
            id,
            adminemail,
            currentgame
        } = req.body;

        console.log( clubname + id + adminemail + currentgame )

        let club = await Club.findOne({
            id
        });

        if (club) {
            return res.status(400).json({
                msg: "Club ID Already Exists"
            });
        }
        
        let email = adminemail
        let admin = await User.findOne({
            email
        });

        if (!admin) {
            return res.status(400).json({
                msg: "Admin Email Not Found"
            });
        }

        
        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();
        let date = year + "-" + month + "-" + day

        console.log(date);
        
        let datecreated = date;
        let startedplaying = date;

        let members = [{
            email: adminemail,
            isadmin: true,
            username: admin.username
        }]
        
        // let discussionposts = [{
        //     posttitle: "👋Welcome to the club!",
        //     postdescription: "In this group, much like a bookclub, you can discuss many of the artistic elements in video games as well as take a closer look at hidden meanings and themes. Enjoy!",
        //     posttype: "announcement",
        //     postdate: date
        // }]

        /**
         * Creating a sample first post for gamer club
         */
        let postid = 0;
        let clubid = id;
        let posttitle = "👋Welcome to the club!";
        let postdescription = "In this group, much like a bookclub, you can discuss many of the artistic elements in video games as well as take a closer look at hidden meanings and themes. Enjoy!"
        let posttype = "announcement";
        let dateposted = date;

        /**
         * CREATE a company account with the right credentials
         */
        let posteremail = "a@gmail.com"

        post = new Post({
            postid,
            clubid,
            posttitle,
            postdescription,
            posteremail,
            
            posttype,
            dateposted
        })

        post.save()


        club = new Club({
            clubname,
            id,
            datecreated,
            adminemail,
            currentgame,
            startedplaying,
            members
        })

        club.save();



        res.json(club)

    } catch (e) {
      res.send({ message: e });
    }
  });


router.get("/test", async (req, res) => {
    try {


      res.send({message: "test"})

    } catch (e) {
      res.send({ message: "Error in Fetching user" });
    }
  });

module.exports = router;
