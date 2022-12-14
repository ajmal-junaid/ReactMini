const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:Object
})

module.exports = mongoose.model("users",userSchema);