//Importing mongoose
const mongoose = require('mongoose'); 
//Connected to Database 
const url = process.env.MONGODB_URL  
console.log(url)
mongoose
	.connect("mongodb+srv://ksp:kspPass@cluster0.i4amd.mongodb.net/riktam", {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.catch((error) => {
		console.log(error)
	})

const con = mongoose.connection
con.once('open', () => console.log("Database Connected Successfully"))