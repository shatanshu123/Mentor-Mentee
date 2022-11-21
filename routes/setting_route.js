const express = require("express")
const router = express.Router()

const token_gen = require("../token_gen");

const User = require("../userModel")


router.post("/", (req, res)=>{
    if(req.oidc.isAuthenticated()){
        console.log("setting/ POST");
        console.log(req.oidc.user);
        const email = req.oidc.user.email
        const firstname= req.body.firstname
        const lastname = req.body.lastname
        const role = req.body.role

        console.log("data from client", firstname, lastname, role);

        User.findOne({email:email}, (err, doc)=>{
            if(err){
                console.error("setting_router error: findOne");
                next(err);
            }

            if(doc){
                doc.firstname = firstname
                doc.lastname = lastname
                doc.role = role
                doc.save((err)=>{
                    if(err){
                        console.error("setting_router error: save doc");
                        next(err);
                    }
                    else{
                        res.send(JSON.stringify({message: "success"}));
                    }
                })
            }
            else{
                console.error("setting_router error: no doc found");
                next(err);
            }
        })
    }
    else{
        res.redirect("/login");
    }
})

module.exports = router;