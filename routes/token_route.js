const express = require("express")
const router = express.Router()

const token_gen = require("../token_gen");

const User = require("../userModel")

// router.get("/", (req, res)=>{
//     if(req.oidc.isAuthenticated()){
//         res.send("token will generate here");

//     }
//     else{
//         res.redirect("/login")
//     }
// })

router.post("/", (req, res) => {
    const to_which_user = req.body.to_which_user
    if (req.oidc.isAuthenticated()) {
        console.log(to_which_user)
        // res.send("token will generate here");
        // if()

        User.findOne({ email: req.oidc.user.email }, (err, doc) => {
            if (err) {
                console.error("token router error")
                return next(err);
            }

            if (doc) {


                User.findOne({ email: to_which_user }, (err1, doc1) => {
                    if (err1) {
                        console.error("token router error")
                        return next(err1);
                    }
                    if (doc1) {
                        // console.log("doc1 doc");
                        // console.log(doc1.agora_cred.token, doc.agora_cred.token);
                        // console.log(doc1.agora_cred.channelName, doc.agora_cred.channelName)
                        // console.log(doc1.agora_cred.is_busy, req.oidc.user.email)
                        
                        if (doc1.agora_cred.token === doc.agora_cred.token && doc1.agora_cred.channelName === doc.agora_cred.channelName && doc1.agora_cred.is_busy === req.oidc.user.email) {
                            return res.send(JSON.stringify({ status: "success", token: doc.agora_cred.token, channelName: doc.agora_cred.channelName, appId: process.env.APPID }));
                        }
                        doc.agora_cred.token = token_gen(doc._id.toString(), 0);
                        doc.agora_cred.channelName = doc._id.toString();
                        doc.agora_cred.is_busy = to_which_user;


                        doc1.agora_cred.token = doc.agora_cred.token
                        doc1.agora_cred.channelName = doc.agora_cred.channelName
                        doc1.agora_cred.is_busy = req.oidc.user.email

                        doc1.save((err2) => {
                            if (err2) {
                                console.error("token save to database error");
                                next(err);
                                return res.send({ status: "error" });
                            }
                            else {
                                doc.save((err) => {
                                    if (err) {
                                        console.error("token save to database error");
                                        next(err);
                                        return res.send({ status: "error" });
                                    }
                                    else {
                                        res.send(JSON.stringify({ status: "success", token: doc.agora_cred.token, channelName: doc.agora_cred.channelName, appId: process.env.APPID }));
                                    }
                                })
                            }
                        });
                    }
                    else {
                        console.error("token router error")
                        return next(new Error("token router: no doc found "));
                    }
                });


            }
            else {
                console.error("token router error")
                return next(new Error("token router: no doc found "));
            }
        })

    }
    else {
        res.redirect("/login")
    }
})

module.exports = router