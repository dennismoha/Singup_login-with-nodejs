//this app fetches a specific user details by id when clicked

const express = require('express');
const route = express.Router();

const userbyId = require('../controller/userbyId');
const {requireSignin,isAuth,isAdmin} = require('../controller/auth'); //checks if the user is logged in


//userbyId in the request.params
//if the user is loggeed in , he can see all the users profile details
//this is mostly for displaying the profile of a certain usr.
route.get('/secret/:userbyId',requireSignin,isAuth,isAdmin,(req,res)=>{
	res.json({
		user: req.profile
	})
})



route.param('userbyId',userbyId.userById)

module.exports = route;