const db = require("../models/user.model");
const bcrypt = require("bcrypt");

const path = require("path");

const getHome = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/home.html"));
};

const getProfile = (req, res) => {
    res.sendFile(path.join(__dirname + "/../views/profile.html"));
};

const updateProfile = async (req, res) => {

    try {

        let userid = req.userid;

        let password = req.body.password;

        if (password != undefined) {
            password = await bcrypt.hash(req.body.password, 10);
        }

        let { name, email, username } = req.body;

        function check(callback) {

            db.query("select * from tbl_user where userid = ?", [userid], (err, rows, fields) => {
                if (!err) {
                    if (name == undefined) {
                        name = rows[0].name;
                    }
                    if (email == undefined) {
                        email = rows[0].email;
                    }
                    if (password == undefined) {
                        password = rows[0].password;
                    }
                    if (username == undefined) {
                        username = rows[0].username;
                    }
                    callback();
                }
                else {
                    console.log(err);
                }
            });
        };

        if (name != undefined && email != undefined && password != undefined && username != undefined) {
            callback();
        }
        else {

            check(callback);
        }

        function callback() {
            var query = "UPDATE tbl_user SET name = ?, email = ?, username = ?, password = ? WHERE userid = ?";
            db.query(query, [name, email, username, password, userid], (err, result) => {
                if (!err) {
                    res.status(200).json({
                        success: "Profile updated",
                        result
                    });
                }
                else {
                    console.log(err);
                }
            });
        };
    } catch (error) {
        console.log(error);
    }

};

module.exports = { getHome, getProfile, updateProfile };