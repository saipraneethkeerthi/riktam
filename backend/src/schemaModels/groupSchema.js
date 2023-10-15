//Importing npm modules
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken");


/**
 * creating a scheema of record
 * declaring required fields and specifying data type
 */

const GroupSchema = new mongoose.Schema({
	groupName: { type: String, required: true, minLength:3},
	createdBy: { type: String, required: true},
	members: { type: Array },
	messages:[{
		content: String,
		sender: String, // User ID of the sender
		timestamp: { type: Date, default: Date.now },
		likes: [String], // Array of user IDs who liked the message
	  }]
});


//assigning model to const variable
const Group = mongoose.model("Group", GroupSchema);

//exporting User
module.exports = Group;
