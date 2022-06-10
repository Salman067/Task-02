const db = require("../models/user.model");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const getBlogPostPage = (req, res) => {
    res.sendFile(path.join(__dirname + ("/../views/blogpost.html")));
};

const postBlogPost = (req, res) => {

    var blogid = uuidv4();

    var userid = req.userid;

    var { title, content } = req.body;
    var status = "published";
    var createtime = new Date();
    var updatetime = new Date();

    var query = "insert into tbl_blog values(?, ?, ?, ?, ?, ?, ?)";

    db.query(query, [blogid, userid, title, content, status, createtime, updatetime], (err, result) => {
        if (!err) {
            res.status(200).json({
                success: "Post was shared",
                result
            });
        }
        else {
            console.log(err);
        }
    });
};

const getAllBlogpost = (req, res) => {

    var query = "SELECT name, title, content FROM tbl_blog NATURAL JOIN tbl_user";

    db.query(query, (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                success: "Blogpost from all",
                rows,
            });
        }
        else {
            console.log(err);
        }
    });
};

const getBlogpost = (req, res) => {

    let username = req.username;

    var query = "SELECT title, content FROM tbl_blog NATURAL JOIN tbl_user WHERE username = ?";

    db.query(query, [username], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                success: `Blogpost from ${username}`,
                rows,
            });
        }
        else {
            console.log(err);
        }
    });
};

const getSpecificUserBlogpost = (req, res) => {

    let username = req.params.username;

    var query = "SELECT title, content FROM tbl_blog NATURAL JOIN tbl_user WHERE username = ?";

    db.query(query, [username], (err, rows, fields) => {
        if (!err) {
            res.status(200).json({
                success: `Blogpost from ${username}`,
                rows,
            });
        }
        else {
            console.log(err);
        }
    });
};


const updateBlogPost = (req, res) => {

    let blogid = req.params.blogid;

    const userid = req.userid;

    let { title, content } = req.body;
    let updatetime = new Date();

    query = "SELECT * FROM tbl_blog WHERE blogid = ?";
    db.query(query, [blogid], (err, result) => {

        if (result.length == 0) {
            res.status(404).json({
                "message": "blog not found",
            });
        }
        else if (userid == result[0].userid) {

            var query = "UPDATE tbl_blog SET title = ?, content = ?, updatetime = ? WHERE blogid = ?";
            db.query(query, [title, content, updatetime, blogid], (err, result) => {
                if (!err) {
                    res.status(200).json({
                        "success": "Post was updated",
                        result
                    });
                }
                else {
                    console.log(err);
                }
            });
        }
        else {
            res.status(401).json({
                "message": "Can not update. Authentication Failed!",
            });
        }
    });
};

const deleteBlogPost = (req, res) => {

    var blogid = req.params.blogid;
    const userid = req.userid;

    query = "SELECT * FROM tbl_blog WHERE blogid = ?";
    db.query(query, [blogid], (err, result) => {


        if (result.length == 0) {
            res.status(404).json({
                "message": "blog not found",
            });
        }

        else if (userid == result[0].userid) {

            var query = "DELETE FROM tbl_blog WHERE blogid = ?";

            db.query(query, [blogid], (err, result) => {
                if (!err) {
                    res.status(200).json({
                        success: "Post was deleted",
                        result
                    });
                }
                else {
                    console.log(err);
                }
            });
        }
        else {
            res.status(401).json({
                message: "Can not delete. Authentication Failed!",
            });
        }
    });
};

module.exports = { getBlogPostPage, postBlogPost, getAllBlogpost, getBlogpost, updateBlogPost, deleteBlogPost, getSpecificUserBlogpost };

