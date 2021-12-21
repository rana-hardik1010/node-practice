var Todos = require('../models/todoModel')

function findUserByName(name){
    try{
        var user = Todos.find({userName:name})
        return user;
    }catch(err){
        throw err
    }
}

function findUserById(id){
    try{
        var user = Todos.findById({_id:id})
        return user;
    }catch(err){
        throw err
    }
}

function deleteUser(id){
    try{
        var user = Todos.findByIdAndRemove({_id:id})
        return user;
    }catch(err){
        throw err
    }
}

module.exports = {findUserByName , findUserById ,deleteUser }