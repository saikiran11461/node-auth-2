const { userModel } = require("../models/user.model");
const  jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
require("dotenv").config()
const userController = {
  getUsers: async (req, res) => {
    try {
      const data = await userModel.find();
      return res.status(200).send({ message: "get data success", data });
    } catch (error) {
      return res.status(500).send(error);
    }
  },

  registerUser: async (req, res) => {
    const {name, email, password ,role} = req.body;
    try {
      let user =await  userModel.findOne({email});
      if (user) {
        return res.status(200).send("user already exists");
      } 
      
       const hashedPassword = await bcrypt.hash(password, 10);

        const new_user = await userModel({
          name:name,
          email: email,
          password: hashedPassword,
          role:role
        });
       await new_user.save();
        res.status(201).send({ message: "user created successfully" , new_user});
      
    } catch (error) {
        return res.status(500).send(error);
    }
  },

  loginUser: async (req, res) => {
    const { email, password } = req.body;
    try {
      let user = await userModel.findOne({email});
      if(!user){
         return res.status(400).send({message:"user not found"})
      }
      let comparePassword = await bcrypt.compare(password, user.password);

      if (!comparePassword) {
        return res.status(400).send({ message: "Invalid credentials" });
      }

        let token =  jwt.sign({email:user.email,_id:user._id,role:user.role},process.env.JWT_SECRET,{expiresIn:"1hr"});

        return res.status(200).send({message:'user logged in success ', token})
    
    } catch (error) {
        return res.status(500).send(error);
    }
  },
};

module.exports = { userController };
