const express = require("express");

const { getSignUpPage, postUserSignUp } = require("../controllers/signUp.controller");


const router = express.Router();

// get sign up page
router.get("/userRegistration", getSignUpPage)

// User sign up
router.post("/userRegistration", postUserSignUp);

module.exports = router;

