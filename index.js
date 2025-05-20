const express = require("express");
const cors = require("cors");
const { userRouter } = require("./src/routes/user.routes");
const { Connection } = require("./src/config/db");
const {authentication} =require("./src/middlewares/authentication");
const { authorization } = require("./src/middlewares/authorisation");
require("dotenv").config()
const app = express();

app.use(cors());
app.use(express.json())

app.use("/users", userRouter)

app.use("/profile",authentication,authorization("admin"), async(req,res)=>{
    console.log(req.user)
    try {
        res.send("access to the profile")
    } catch (error) {
        res.send(error)
    }
})

app.listen(process.env.PORT,async()=>{
    try {
        await Connection()
        console.log(`running on the port ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})