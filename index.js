const express=require("express")
const {connection}=require("./db")
const userRouter=require("./route/user.route")
const blockrouter=require("./route/block.route")

const app=express()
app.use(express.json())
app.use(blockrouter)
app.use(userRouter)



app.get("/",(req,res)=>{
    res.send("home page here...")
})

app.listen(6500, async()=>{
    try{
        await connection
        console.log("connected to DB");
    }catch(err){
        console.log(err);
    }
    console.log("Server is running on port 6500");
})