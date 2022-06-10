const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const indexRoute = require("./routes/index.route");
const signUpRoute = require("./routes/signUp.route");
const logInRoute = require("./routes/logIn.route");
const userRoute = require("./routes/user.route");
const blogpostRoute = require("./routes/blogpost.route");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(indexRoute);
app.use(signUpRoute);
app.use(logInRoute);
app.use(userRoute);
app.use(blogpostRoute);


app.use((req, res, next) => {
    res.status(404).json({
        "message": "Error! Page not found",
    });
});

app.use((err, req, res, next) => {
    if(res.headerSent){
        return next(err);
    }
    res.status(500).json({
        "message": err,
    });
});

module.exports = app;