const mongoose = require("mongoose");

const GamerClub = mongoose.Schema({

  clubname: String,
  id: String,
  adminemail: String,
  currentgame: String,
  members: [{email: String}],
  discussionposts : [
      {postQuestion: String, postDescription: String, comments: []}
    ]
   
});

// export movie user
module.exports = mongoose.model("gamerclub", GamerClub);