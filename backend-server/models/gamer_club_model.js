const mongoose = require("mongoose");

const GamerClub = mongoose.Schema({

  name: String,
  id: String,
  admin: String,
  members: [{email: String}],
  discussionposts : [
      {postQuestion: String, postDescription: String, comments: []}
    ]
   
});

// export movie user
module.exports = mongoose.model("gamerclub", GamerClub);