//implements the logic of the express validator
 //we can check the all the methods below from express-validator
const  userSignupValidator = (req,res,next)=> {
	req.check('name','Name is required').notEmpty()
	req.check('email','Email must be between 3 to 32 characters')
		.matches(/.+\@.+\../)
		.withMessage('email must contain @')
		.isLength({
			min: 4,
			max: 32
		});

	req.check('hashed_password','passed is required').notEmpty
	req.check('hashed_password')
		.isLength({min: 6})
		.withMessage('password must contain atleast 6 characters')
		.matches(/\d/) //must have atleast one digit and number
		.withMessage('password must contain a number');
	const errors = req.validationErrors() //this method grabs all the errors
	if(errors) { //goes through the errors and shows any error in the errors variable
		const firstError = errors.map(error => error.message)[0];
		return res.status(400).json({
			error: firstError
		});
	}
	next();

}