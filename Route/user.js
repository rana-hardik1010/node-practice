var router = require('express').Router();
var userController = require('../controller/userController')

router.get('/',userController.index)

module.exports = {router}