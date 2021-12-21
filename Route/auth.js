var router = require("express").Router();
var authController = require('../controller/authController')
var auth = require('../middleware/authMiddleware')

router.post('/register',authController.register)
router.post('/login',authController.login)
router.get('/getuser',auth,authController.getUser)


module.exports = {router}