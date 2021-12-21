var Todos = require('../models/todoModel')
var {findUserByName , findUserById ,deleteUser } = require('../service/apiService')

module.exports ={

    getRecordByName : async function getRecordByName(req,res){
        // Todos.find({userName:req.params.uname},
        //     function(err,todos){
        //         if(err) throw err;
        //         res.send(todos)
        //     })
        var user = await findUserByName(req.params.uname)
        res.send(user)
    },
    getRecordById : async function getRecordById(req,res){
        var user = await findUserById(req.params.id);
        res.send(user);
    },
    create : function create(req,res){
        if(req.body.id){
            Todos.findByIdAndUpdate(req.body.id,{
                userName:req.body.userName,
                todo:req.body.todo,
                isDone:req.body.isDone,
                hasAttachment:req.body.hasAttachment
            },function(err){
                if(err) throw err
                res.send("success update")
            })
        }else{
            var newTodo = Todos({
                userName:req.body.userName,
                todo:req.body.todo,
                isDone:req.body.isDone,
                hasAttachment:req.body.hasAttachment
            })
            newTodo.save(function(err){
                if(err) throw err
                res.send('success')
            })
        }
    },
    deleteData : async function deleteData(req,res){
        var user = await deleteUser(req.body.id);
        if(user){
            let meta = { message: "User Deleted", status: "Success" };
            res.status(200).json(meta);
        }
        // rea.send("Delete Success")
        // Todos.findByIdAndRemove(req.body.id,function(err){
        //     if(err) throw err
        //     res.send("record deleted succesfully")
        // })
    },
}