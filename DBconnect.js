
const mongoose = require("mongoose")



const connect = async ()=>{
    try{
        await mongoose.connect(process.env.DBconnect, {useNewUrlParser: true, useUnifiedTopology: true});
        console.log("database connected\n");
    }
    catch(err){
        console.log(err)
    }
}

module.exports = connect;