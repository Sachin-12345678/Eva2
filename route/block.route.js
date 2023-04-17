const express=require("express")
const router=express.Router()
const Block=require("../model/blockmodel")
const authentication=require("../middleware/middleware.authenticate")

router.post("/add", authentication , async(req,res)=>{
    const payload=req.body
    try {
        const user=new Block(payload)
        await user.save()
        res.send(user)
    } catch (error) {
        console.log(error);
    }
})

router.get("/get", authentication, async(req,res)=>{
    try {
         const user = await Block.find()
        res.send(user)
      } catch (error) {
        console.log(error);
    }
})

module.exports=router;