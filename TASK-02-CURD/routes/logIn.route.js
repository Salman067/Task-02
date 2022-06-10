const express = require("express");
const { getLogInPage, postUserLogin } = require("../controllers/logIn.controller");

const router = express.Router();

// get log in page
router.get("/userLogin", getLogInPage)

// user log in
router.post("/userLogin", postUserLogin)

module.exports = router;