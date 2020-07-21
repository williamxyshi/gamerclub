const mongoose = require("mongoose");

const Comment = mongoose.Schema({

  commentid: String,

  commentbody: String, 

  commenteremail: String,

  dateposted: String,

  postid: String, 
  clubid: String

});

// export movie user
module.exports = mongoose.model("comment", Comment);