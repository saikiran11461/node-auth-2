const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{type:String, required:true},
    email:{type:String,required:true, new:true},
    password:{type:String,required:true},
    role:{type:String,enum:["admin","user","seller"], default:"user"}
},{
    timestamps:true,
    versionKey:false
})

const userModel = mongoose.model("user", userSchema);

module.exports= {userModel}