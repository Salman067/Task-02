const db = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const path = require("path");

const getLogInPage = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/login.html"));
}

const postUserLogin = (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    let query = "select * from tbl_user where username = ? ";

    db.query(query, [username], (err, results) => {

        if (results.length == 1) {

            hash = results[0].password;
            userid = results[0].userid;

            bcrypt.compare(password, hash, (err, result) => {

                if (result == true) {
                    // generate jwt
                    let jwtSecretKey = process.env.JWT_SECRET_KEY;

                    let data = {
                        username: username,
                        userid: userid
                    };
                    let expiresIn = {
                        expiresIn: "1h"
                    };

                    const token = jwt.sign(data, jwtSecretKey, expiresIn);

                    res.status(200).json({
                        "access_token": token,
                        "message": "log in Successful"
                    });
                }

                else {
                    res.status(401).json({
                        "message": "log in failed! Invalid username or password."
                    });
                }

            });
        }
        else {
            res.status(401).json({
                "message": "log in failed! Invalid username or password."
            });
        }
    });

}

module.exports = { getLogInPage, postUserLogin };
