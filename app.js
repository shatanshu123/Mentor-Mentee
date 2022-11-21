
require("dotenv").config()
const express = require("express")
const app = express()
const DBconnect = require("./DBconnect");
const User = require("./userModel");
const token_route = require("./routes/token_route")
const setting_route = require("./routes/setting_route")
const populate_mm = require("./routes/populate_m&m")
const bodyParser = require("body-parser")

const { auth } = require('express-openid-connect');

const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.SECRET,
    baseURL: process.env.BASEURL,
    clientID: process.env.CLIENTID,
    issuerBaseURL: 'https://dev-3zfsci9p.us.auth0.com'
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));

app.use(express.json());

app.use(bodyParser.urlencoded({
    extended: false
}))

//template engine
app.set("view engine", "ejs")

//connect db
DBconnect()

//routes
app.use("/token", token_route);
app.use("/setting", setting_route);
app.use("/populate", populate_mm);



// req.isAuthenticated is provided from the auth router
app.get('/', (req, res, next) => {
    console.log("user", req.oidc.user);
    if (req.oidc.isAuthenticated()) {
        const email = req.oidc.user.email;

        User.findOne({ email: email }, (err, doc) => {
            console.log("doc ", doc);
            if (err) {
                return next(new Error("findOne db error"));
            }

            if (doc) {
                return res.render("home", { user:doc});
            }
            else {
                 doc.firstname= firstname;
                 doc.lastname = lastname;
                 doc.email = email;
                 doc.role = "mentee"
                const user = new User(doc);
                user.save((err) => {
                    if (err) {
                        return next(new Error("User.save db error"));
                    }
                    else {
                        return res.render("home", { user: doc });
                    }
                })
            }
        })

        // res.send(`Logged In :  ${req.oidc.user.email}`);
    }
    else {
        //   res.send("Logged out");
        res.redirect("/login");
    }
    //   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.all((req, res, next, err) => {
    if (err) {
        res.send("Error", err);
    }
})

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server started at ${port}`)
})