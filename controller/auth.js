const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/user')



const users = (req,res)=> {
	User.find().then(
		(users)=> {
			res.status(200).json(users);
		}).catch((error)=> {
			res.status(400).json({
				error: error
			})
		})
}

const Singup = (req,res) => {
	bcrypt.hash(req.body.hashed_password, 10).then(
		(hash) => {
			console.log('this is the hash password',hash);
			const user = new User ({
				name : req.body.name,
				email: req.body.email,
				hashed_password: hash

			});


			user.save().then(
				() => {
					res.status(201).json({
						message: "User saved successfully"
					})
				}
				) .catch(
				(error)=> {
					throw error;
					res.status(500).json({						
						error:error
					})
				}
				)
		}
		).catch((error)=> {
			throw error
		})
}

const Login = (req,res) => {
	User.findOne({email:req.body.email}).then(
		(user)=> {
			if(!user) {
				return res.status(401).json({
					error: new Error('email does not exist')
				})
			}console.log(req.body);
			 console.log(user.hashed_password);


			bcrypt.compare(req.body.hashed_password,user.hashed_password).then(
				(valid)=> {

					if(!valid) {
						return res.status(401).json({
							error: new Error('incorrect passowrd')
						})
					}

					const token = jwt.sign({userId : user._id},'RANDOM USER AUTHENTICATION STRING')
					//persist the token as 't' with cookie expiry date
					res.cookie('t',token, {expire: new Date() + 9999})
					//return response with user and token to frontend
					const {_id, name, email, role} = user;
					return res.json({token, user: {_id, name, email,role}})

					res.status(200).json({
						userId: user._id,
						token : 'token'
					})
				}).catch((error)=>{
					
					res.status(500).json({
						error : error
					})
				})
		}).catch((error)=> {
			
			res.staus(500).json({
				error: error
			})
		})
}

const Signout = (req, res)=> {
	res.clearCookie('t')
	res.json({message: 'Signout successful'});
}

//protects the routes from access by someone who's not signed in.. looks for a token if not available throws 
//an error
//make sure cookieparser is installed
//and express-jwt is also installed
const requireSignin = expressJwt({	 
	secret: 'RANDOM USER AUTHENTICATION STRING',
	userProperty :'auth'
});

//protects a given route by checking if the user is currently authenticated
const isAuth =(req,res,next) => {
	let user = req.profile && req.auth && req.profile._id == req.auth._id
	if(!user) {
		return res.status(403).json({
			error: "Access denied"
		})
	}
	next();
};

//checks if a given user is an admin

const isAdmin = (req,res,next) =>{
	if(req.profile.role === 0) {
		return res.status(403).json({
			error: "Admin section Access Denied:"
		})
	}
	next();
}


module.exports = {users,Singup,Login,Signout,requireSignin,isAdmin,isAuth}