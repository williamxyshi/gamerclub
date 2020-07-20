const mongoose = require("mongoose");

const GamerClub = mongoose.Schema({

  clubname: String,
  id: String,
  dateCreated: String,


  adminemail: String,

  currentgame: String,
  startedPlaying: String,


  members: [{email: String, isAdmin: String, username: String}],

  discussionposts : [
      {postTitle: String, postDescription: String, postType: String, comments: []}
    ]
   
});

// export movie user
module.exports = mongoose.model("gamerclub", GamerClub);