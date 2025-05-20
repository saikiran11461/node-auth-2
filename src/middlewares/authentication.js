
const jwt = require("jsonwebtoken");
require("dotenv").config()
const authentication = (req,res,next)=>{
    let headers =  req.headers?.authorization;
    
    if (!headers) {
        return res.status(401).json({ error: "Authorization header missing. Please login again." });
    } else {
        const user_token = req?.headers?.authorization?.split(" ")[1];
        // console.log(user_token)
        jwt.verify(user_token, process.env.JWT_SECRET, function (err, decoded) {
            if (err !== null) {
                return res.status(401).send({ error: "Invalid or expired token. Please login again." });
            }
            req.user = decoded;
            
            next();
        });
    }
}


module.exports = {authentication}