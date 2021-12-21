var Todos = require('../models/todoModel')

module.exports = {
    index:function index(req,res){
        var result = Todos.find({$not : [{userName:"Prakash"}]}).select().countDocuments();
        res.send(result)
    }
}