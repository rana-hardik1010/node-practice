const {signUp,checkEmail,getUserData} = require('../service/authService')
const { Validator } = require('node-input-validator');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

module.exports = {
    register : async  function register(req,res){

        const validate = new Validator(req.body, {
            first_Name: 'required',
            last_Name: 'required',
            email: 'required|email',
            password: 'required',
            cPassword: 'required'
        });

        let matched = await validate.check();
        const {email,password,cPassword} = req.body

        if(!matched){
            let meta = { message: "Bad Requiest", status: "Failed" };
            res.status(400).json(meta);
        }else {
            if(password !== cPassword){
                let meta = { message: "Password and Confirm Password Must be Same", status: "Failed" };
                res.status(400).json(meta);
            }else{
                var emailExist = await checkEmail(email);
                if(!emailExist){
                    var isSignup = await signUp(req);
                    if(isSignup){
                        let meta = { message: "User Registered successfully", status: "Success" ,token:isSignup.token};
                        res.status(200).json(meta);
                    }
                }else{
                    let meta = { message: "User is already Exist", status: "Failed" };
                    res.status(403).json(meta);
                }
            }
        }
    },
    login : async function login (req,res){

        const validate = new Validator(req.body, {
            email: 'required',
            password: 'required'
        });
        const {email,password} = req.body;

        let matched = await validate.check();
        if(!matched){
            let meta = { message: "Bad Requiest", status: "Failed" };
            res.status(400).json(meta);
        }else {
            var checkUser = await checkEmail(email)
            if(checkUser){
                const isMatch = await bcrypt.compare(password, checkUser.password);
                if(isMatch){
                    var token = jwt.sign({
                        exp: Math.floor(Date.now() / 1000) + (60 * 60),
                        userId: checkUser._id
                    }, 'jwtSecretToken');
                    let meta = { message:"Login successfully", status:"Success" , token:token };
                    res.status(200).json(meta);
                }else{
                    let meta = { message:"Invalid Credential", status:"Failed" };
                    res.status(401).json(meta);
                }
            }else{
                let meta = { message: "User not Exist", status: "Failed" };
                res.status(404).json(meta);
            }
        }
    },
    getUser : async function getUser(req,res){
        var data = await getUserData()
        res.json(data)
    }
}