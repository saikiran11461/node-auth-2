

const authorization = (role) =>(req,res,next)=>{
    if(!req.user.role.includes(role)){
        return res.status(403).json({ error: "Access denied: insufficient permissions" });
    }
    next()
}

module.exports = { authorization}

