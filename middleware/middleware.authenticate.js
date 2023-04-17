const User=require("../model/user.model")
const jwt=require("jsonwebtoken")
const {blacklist}=require("../model/blacklist")

const authentication= async(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1]
    try {
        if(blacklist.includes(token))
        {
            res.send("Please login again")
        }
        const decodedtoken=jwt.verify(token,"masai")
        const {userId}=decodedtoken
        const user= await User.findById(userId)
        if(!user)
        {
            res.send({"mgg":"Unauthorized"})
        }
        req.user=user
        next()
    } catch (error) {
        res.send({"msg":"unauthorized",error:error.message})
        console.log(error);
    }
}

module.exports=authentication;