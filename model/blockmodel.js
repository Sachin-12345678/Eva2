const mongoose=require("mongoose")
const userschema=mongoose.Schema({

    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
});

const Block=mongoose.model("Block", userschema);

module.exports=Block;

