const express = require("express")
const router = express.Router()

const token_gen = require("../token_gen");

const User = require("../userModel")

router.post("/", (req, res)=>{
    const current_role = req.body.role;

    User.find({role: current_role}, (err, docs)=>{
        if(err){
            console.error("error router populate m&m");
            res.send(JSON.stringify({status:"error"}));
        }
        
        if(docs){
            res.send(JSON.stringify({status:"success", data: docs}));
        }
        else{
            res.send(JSON.stringify({status:"success", data: []}));
        }
    })
})



module.exports = router;