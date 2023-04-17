const mongoose=require("mongoose")
const connection=mongoose.connect("mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/user1?retryWrites=true&w=majority")

module.exports={
    connection
}

//mongodb+srv://sachin:chavan@cluster0.1kuxcjb.mongodb.net/user1?retryWrites=true&w=majority