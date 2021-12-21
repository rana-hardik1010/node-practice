var Users = require('../models/userModel')
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

 async function signUp (req){
    try{
        const saltRounds = 10;

        var hashPass = await bcrypt.hash(req.body.password, saltRounds);
        var newUser = Users({
            first_Name : req.body.first_Name,
            last_Name : req.body.last_Name,
            email : req.body.email,
            password: hashPass,
        })
        var reg = await newUser.save();
        if(reg){
            var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                userId: reg._id
            }, 'jwtSecretToken');
        }
        return {register:reg , token:token}
    }catch(err){
        throw err
    }
}

async function checkEmail(email){
    try{
        return await Users.findOne({email: email})
    }catch(err){
        throw err
    }
}

function getUserData () {
    try{
        var userList = Users.find();
        return userList;
    }catch(err){
        throw err
    }
}

module.exports = {signUp,checkEmail,getUserData}