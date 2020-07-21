const mongoose = require("mongoose");

const User = mongoose.Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },

  joinedclubs: [{clubid: String}],
  posts: [{postid: String}],
  comments: [{commentid: String}]
});

// export model user with UserSchema
module.exports = mongoose.model("user", User);
