const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');//makes sure or throws error during login if name or email or password is empty

//user routes
const authRoutes = require('./routes/user');
const userById = require('./routes/userbyId');

const app = express();
require('dotenv').config();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
})

mongoose.connect(process.env.DATABASE,{
	useNewUrlParser:true,
	useCreateIndex: true
	})
	.then(()=> {
		console.log("successfully connected")
	})
	.catch((error)=>{
		console.log("connection unsuccessful")
		console.error(error);
	})

//other middlewares
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cookieParser());
app.use(expressValidator());


//routes middlewares
app.use('/auth',authRoutes)
app.use('/user',userById)

const port = process.env.PORT || 3000

app.listen(port,(err)=> {
	if(err) {
		throw err
	}
	console.log('server sucessfully connected')
})