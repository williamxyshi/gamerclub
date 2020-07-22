const mongoose = require("mongoose");

const GamerClub = mongoose.Schema({

  clubname: String,
  id: String,
  datecreated: String,


  adminemail: String,

  currentgame: String,
  startedplaying: String,


  members: [{email: String, isadmin: String, username: String}],
  reachedDeadline: [{email: String, username: String}]

   
});

// export movie user
module.exports = mongoose.model("gamerclub", GamerClub);