var Todos = require('../models/todoModel')

module.exports = {
    setup:function setup(req,res){
        var todoList = [{
            userName : "Hardik",
            todo : "Test",
            isDone : false,
            hasAttachment : false
        },{
            userName : "Prakash",
            todo : "Development",
            isDone : false,
            hasAttachment : false
        },{
            userName : "Vismay",
            todo : "Design",
            isDone : false,
            hasAttachment : false
        }]
        Todos.create(todoList,function(err,result){
            res.send(result)
        })
    }
}