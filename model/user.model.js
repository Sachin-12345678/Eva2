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

const User=mongoose.model("User", userschema);

module.exports=User;

