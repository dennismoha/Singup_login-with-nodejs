const mongoose = require('mongoose');
const crypto = require('crypto');
const uuidv1 = require('uuid/v1')


mongoose.connect("mmongodb+srv://admin:@$$mon254@admin-dzypr.mongodb.net/test?retryWrites=true&w=majority",{useNewUrlParser:true})
	.then(()=> {
		console.log("successfully connected")
	})
	.catch((error)=>{
		console.log("connection unsuccessful")
		console.error(error);
	})

const userSchema = new mongoose.Schema({
	name:{type: String, required:true, trim:true,maxLength: 32},
	email:{type:String, required:true,trim:true, unique:true},
	hashed_password:{type:String, required:true},
	about: {type:String, trim: true},
	salt: String,
	role: {type: Number, default:0},
	history: {type: Array, default:[]}
}, {timestamps:true});




module.exports = mongoose.model('Users', userSchema)