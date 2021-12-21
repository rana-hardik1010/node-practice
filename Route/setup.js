var router = require('express').Router();
const setUpController = require("../controller/setUpController");

router.get('/',setUpController.setup);

module.exports = {router}