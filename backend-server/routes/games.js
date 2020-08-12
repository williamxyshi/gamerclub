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
 * retrieves club and all attached items, posts, comments
 */
router.post("/getclubsforhome", auth, async(req,res) => {
    // try {

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }


       
        var clublist = []


        for(i = 0; i < user.joinedclubs.length; i++){
            let clubid = user.joinedclubs[i].clubid
            let club = await Club.findOne({
                id: clubid
            });

            clublist.push({
                clubname: club.clubname,
                posterurl: club.gameurl,
                clubid: club.id
            })
        }

        res.json({
            clublist
        })

    // } catch (e) {

    //   res.send({ message: "Could Not Retrieve Clubs"});

    // }
})



/**
 * retrieves club and all attached items, posts, comments
 */
router.post("/getclub", auth, async(req,res) => {
    try {

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
        } = req.body;

        let club = await Club.findOne({
            id: clubid
        });

        if (!club) {
            return res.status(400).json({
                msg: "Invalid Club ID"
            });
        }

        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Create Post"});

    }
})



/**
 * add comment to post
 */
router.post("/addcomment", auth, async(req,res) => {
    try {

        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        let date = year + "-" + month + "-" + day

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
            postid,
            commentbody
        } = req.body;

        let club = await Club.findOne({
            id: clubid
        });

        if (!club) {
            return res.status(400).json({
                msg: "Invalid Club ID"
            });
        }

        let post = await Post.findOne({
            postid, clubid
        })

        if (!post) {
            return res.status(400).json({
                msg: "Invalid Post ID"
            });
        }


        var comments = await Comment.find({
            clubid, postid
        })

        let comment = new Comment({
            commentid: comments.length,
            commentbody: commentbody,
            commenteremail: user.email,
            dateposted: date,
            postid: postid,
            clubid: clubid

        })

        await comment.save()

        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Create Post"});

    }
})



/**
 * set/unset reached deadline
 * for specific user
 */
router.post("/toggledeadline", auth, async(req,res) => {
    try {

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,

        } = req.body;

        let club = await Club.findOne({
            id: clubid
        })

        var reached = false;
         
        for(i = 0; i < club.reachedDeadline.length; i++){
            var member = club.reachedDeadline[i];
            if(member.email == user.email){
                reached = true;
                break;
            }
        }


       


        console.log(reached)

        if(reached == false){
            club.reachedDeadline.push({
                email: user.email,
                username: user.username
            })
        } else {
            function removeuser(value){
                return value.email != user.email
            }

            club.reachedDeadline = club.reachedDeadline.filter(removeuser)
        }


        await club.save()


 let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Change Reached Deadline"});

    }
})



/**
 * change deadline
 * 
 */
router.post("/changedeadline", auth, async(req,res) => {
    try {


        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
            newdeadline,
            deadlinedescription,
        } = req.body;


        let clubcheck = await Club.findOne({
            id: clubid
        })


        let club = await Club.findOneAndUpdate({
            id: clubid
        }, {
            currentdeadline: newdeadline,
            deadlinedescription: deadlinedescription,
            $set: {reachedDeadline: []}
        
        },{
            new: true
        })


        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Change Deadline"});

    }
})



/**
 * change game
 * 
 * changes the currently playing game
 * probably make a post about it too
 */
router.post("/changegame", auth, async(req,res) => {
    try {

        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);

        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

        // current year
        let year = date_ob.getFullYear();
        let date = year + "-" + month + "-" + day

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
            currentgame,
            posterurl,
        } = req.body;


        let clubcheck = await Club.findOne({
            id: clubid
        })

        if(clubcheck.currentgame == currentgame){
            return res.status(400).json({
                msg: "Please Change to a Different Game"
            });
        }


        let pastgame = clubcheck.currentgame


        let club = await Club.findOneAndUpdate({
            id: clubid
        }, {
            currentgame: currentgame,
            currentdeadline: null,
            deadlinedescription: null,
            gameurl: posterurl,

            startedplaying: date,

            $push: {playedgames: {
                game: pastgame,
                datebeat: date
            }},
            $set: {reachedDeadline: []}

        },{
            new: true
        })

        var posts = await Post.find({
            clubid
        })
        


        let post = new Post({
            postid: posts.length,
            clubid: clubid,
            posttitle: "Attention GAMERS. This club is now playing " + currentgame,
            postdescription: "Enjoy the change in scenery!",
            posteremail: "a@gmail.com",
            
            posttype: "announcement",
            dateposted: date
        })

        post.save()

        posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Change Game"});

    }
})



/**
 * edit post
 * 
 * we take in new/old copy of the post, and just update everything.
 */
router.post("/editpost", auth, async(req,res) => {
    try {

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
            postid,
            postdescription,
            posttitle,
            posttype
        } = req.body;

        let post = await Post.findOneAndUpdate({
            clubid: clubid,
            postid: postid
        }, {
            postdescription: postdescription,
            posttitle: posttitle,
            posttype: posttype

        }, {
            new: true
        })

        if(!post){
            return res.status(400).json({
                msg: "Could Not Retrieve Post"
            });

        }

        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Edit Post"});

    }
})



/**
 * add post
 */
router.post("/addpost", auth, async(req,res) => {
    try {

        let date_ob = new Date();
        let day = ("0" + date_ob.getDate()).slice(-2);
        // current month
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        // current year
        let year = date_ob.getFullYear();
        let date = year + "-" + month + "-" + day

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubid,
            posttitle,
            postdescription,
            posttype
        } = req.body;

        let club = await Club.findOne({
            id: clubid
        });

        if (!club) {
            return res.status(400).json({
                msg: "Invalid Club ID"
            });
        }


        var posts = await Post.find({
            clubid: clubid
        })


        let post = new Post({
            postid: posts.length,
            clubid: clubid,
            posttitle: posttitle,
            postdescription: postdescription,
            posteremail: user.email,
            posttype: posttype,
            dateposted: date
        })
        
        await post.save();

        posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Create Post"});

    }
})



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
 * leave club
 */
router.post("/leaveclub", auth, async(req,res) => {
    try {

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

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
         * Check user is in club
         */

        var isInClub = false;
        for(i = 0; i< club.members.length; i++){

            let currentM = club.members[i];

            if (currentM.email == user.email){
                if(currentM.isadmin == true){

                    console.log(currentM.isadmin)
                    return res.status(400).json({
                        msg: "Cannot Leave Your Own Club"
                    });

                }
                isInClub = true;
                break;
            }
        }
        
        if(!isInClub){
            return res.status(400).json({
                msg: "User Not In Club"
            });
        }


        /**
         * remove user from club
         */
        function checkUser(value){
            return value.email != user.email;
        }

        club.members = club.members.filter(checkUser)
        club.reachedDeadline = club.reachedDeadline.filter(checkUser)
        club.save()


        /**
         * remove club from user
         */
        function checkClub(value){
            return value.clubid != id
        }

        user.joinedclubs = user.joinedclubs.filter(checkClub)
        user.save()

    
        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

    } catch (e) {

      res.send({ message: "Could Not Leave Club"});

    }
})



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

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }


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

        for(i = 0; i< club.members.length; i++){

            let currentM = club.members[i];
            if (currentM.email == user.email){
                return res.status(400).json({
                    msg: "User Already In Club"
                });
            }

        }

        let member = {
            email: user.email,
            isadmin: false,
            username: user.username

        }

        let joinedclub = {
            clubid: id
        }
        //add to clubs member list
        Club.findOneAndUpdate({id: id}, {$push: {members: member}},{new: true}, (err, result) => {
            console.log(err, result);
          })

        //add club to users club list
        User.findOneAndUpdate({email: user.email}, {$push: {joinedclubs: joinedclub}},{new: true}, (err, result) => {
            console.log(err, result);
          })



        //make post about new user joining club
        let clubid = id;

        var posts = await Post.find({
            clubid: id
        })
        
        let postid = posts.length

        let posttitle = user.username + " has joined the club!";
        let postdescription = "Please give them a warm welcome"
        let posttype = "announcement";
        let dateposted = date;

        let posteremail = "a@gmail.com"

        let post = new Post({
            postid,
            clubid,
            posttitle,
            postdescription,
            posteremail,
            
            posttype,
            dateposted
        })
        console.log(post);
        post.save();


    
        
        posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

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

        const user = await User.findById(req.user.id);

        if(!user){
            return res.status(400).json({
                msg: "Invalid User"
            });
        }

        const {
            clubname,
            id,
            adminemail,
            currentgame,
            gameurl
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
        let posteremail = clubname

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
            members,
            gameurl,


            currentdeadline: null,
            deadlinedescription: null
        })

        club.save();


        let joinedclub = {
            clubid: id
        }


           //add club to users club list
        User.findOneAndUpdate({email: user.email}, {$push: {joinedclubs: joinedclub}},{new: true}, (err, result) => {
            console.log(err, result);
          })



        let posts = await Post.find({
            clubid
        })

        let postsBundle = [];

        for(i = 0; i < posts.length; i++){
            const currentpost = posts[i];

            let postcomments = await Comment.find({
                clubid, postid: currentpost.postid
            })

            postsBundle.push({
                post: currentpost,
                comments: postcomments
            })
        }

    
        res.json({
            club: club,
            postscomments: postsBundle
        })

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
