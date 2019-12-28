 const User = require('../models/user');

 const userById = (req,res,next, id)=> {
 	User.findById(id).exec((err,user)=>{
 		if(err || !user) {
 			console.log('user not found')
 			res.status(400).json({
 				message: 'user not found'
 			})
 		}
 		req.profile = user; // here we're feeding req.profile with the user details
 		next();
 	})
 }

 module.exports={userById}