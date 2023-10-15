//Importing npm modules
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const UserSchema = new mongoose.Schema({
	userName: { type: String, required: false, minLength:3},
	password: { type: String, required: true, minLength:8},
	email: { type: String, required: true, maxLength: 50 },
	role:{ type: String,enum:['admin','user']}
});


//assigning model to const variable
const User = mongoose.model("User", UserSchema);

//exporting User
module.exports = User;
