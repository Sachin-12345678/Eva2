const express=require("express")
const router=express.Router()
const bcrypt=require("bcrypt")
const User=require("../model/user.model")
const jwt=require("jsonwebtoken")
const {blacklist}=require("../model/blockmodel")


router.post("/signup", async(req,res)=>{
    console.log(req.body)
    const {username,email,password}=req.body
    try{
        const userexit=await User.findOne({email})
        if(userexit){
            res.send("user already exists")
        }
        const hash=bcrypt.hashSync(password,8)
        const user=new User({username,email,password:hash})
        await user.save()
        res.send({user})
    }catch(error){
        console.log(error);
        res.send("something went wrong")
    }
})

router.post("/login", async(req,res)=>{
    const {email,password}=req.body
    try{
        const user=await User.findOne({email})
        if(!user){
            res.send("invalid email")
        }
        const passmatch= await bcrypt.compareSync(password,user.password)
        if(!passmatch){
          res.send("invalid password")
        }
        const token=jwt.sign({userId:user._id},"masai",{
            expiresIn:60
        })
        const refrestoken=jwt.sign({userId:user._id},"school",{
            expiresIn:180
        })
        res.send({token,refrestoken})
    
    }catch(error){
        console.log(error);
        res.send("something went wrong")
    }
})

router.get("/newtoken",(req,res)=>{
    const refresh_token=req.headers.authorization.split(" ")[1]
    if(!refresh_token){
        res.send("please login again")
    }
    jwt.verify(refresh_token,"school",(err,decoded)=>{
        if(err){
            res.send("please login again")
        }
        else{
            const token=jwt.sign({userId:decoded.userId},"masai",{
                expiresIn:60
            })
            res.send({token})
        }
    })
})

router.get("/logout",(req,res)=>{
    blacklist.push(req.headers?.authorization?.split(" ")[1])
    res.send("logout successfull")
})

module.exports=router;



