const express = require('express');
const auth = require('../controller/auth');
const Signupvalidator = require('../validator/index')
 const requireSignin = require('../controller/auth')
const router = express.Router();

router.get('/test/',requireSignin.users)
router.post('/Signup/',Signupvalidator,auth.Singup)
router.post('/login/',auth.Login)
router.get('/signout/',auth.Signout)


module.exports = router