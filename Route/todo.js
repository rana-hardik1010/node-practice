var router = require("express").Router();
var apiController = require('../controller/apiController')

router.get('/todos/:uname',apiController.getRecordByName)
router.get('/todo/:id',apiController.getRecordById)
router.post('/todos',apiController.create)
router.delete('/delete/todos',apiController.deleteData)

module.exports = {router}