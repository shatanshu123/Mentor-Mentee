const mongoose = require("mongoose")

const User = new mongoose.Schema({
    firstname:{
        type:String,
        max:255
    },
    lastname:{
        type:String,
        max:255
    },
    email:{
        type:String,
        max:255,
        unique:true
    },
    visited:{ //number of time visited
        type:Number
    },
    role:{ // role: mentor || mentee
        type:String,
        max:6
    },
    agora_cred:{
        token:{
            type:String,
            max:1000
        },
        channelName:{
            type:String,
            max:1000
        },
        is_busy:{
            type:String,
            max:1000
        }
    }
},
{timestamps:true}
)


module.exports = mongoose.model("User", User)