const mongoose = require("mongoose");
require("dotenv").config()

const Connection  = () =>{
    let mongoUrl = process.env.MONGO_URL;

    return mongoose.connect(mongoUrl);
}

module.exports = {Connection}