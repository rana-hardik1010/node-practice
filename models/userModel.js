var mongoose = require('mongoose');

var Schema = mongoose.Schema

var userSchema = new Schema({
    first_Name : String,
    last_Name : String,
    email : String,
    password: String,
    // hasAttachment : Boolean
})

var Todos = mongoose.model('Users',userSchema)

module.exports = Todos