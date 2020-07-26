const mongoose = require("mongoose");

const GamerClub = mongoose.Schema({

  clubname: String,
  id: String,
  datecreated: String,


  adminemail: String,

  currentgame: String,
  /**
   * date we started playing the game
   */
  startedplaying: String,

  /**
   * Not set on creation, but added later on. 
   */
  currentdeadline: String,
  deadlinedescription: String,


  playedgames: [{
    game: String, datebeat: String
  }],


  members: [{email: String, isadmin: String, username: String}],
  reachedDeadline: [{email: String, username: String}]

   
});

// export movie user
module.exports = mongoose.model("gamerclub", GamerClub);