const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user_model.js");

db.mongoose.set('useFindAndModify', false);

module.exports = db;
