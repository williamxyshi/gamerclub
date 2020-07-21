const mongoose = require("mongoose");

const Post = mongoose.Schema({

  postid: String,
  posttitle: String, 
  postdescription: String, 
  
  posteremail: String,

  posttype: String, 
  dateposted: String,


  clubid: String

});

// export movie user
module.exports = mongoose.model("post", Post);