const express = require("express");

const {userController} = require("../controllers/user.controller");

const userRouter = express.Router();


userRouter.get("/", userController.getUsers);
userRouter.post("/register", userController.registerUser);
userRouter.post("/login", userController.loginUser);


module.exports = { userRouter}