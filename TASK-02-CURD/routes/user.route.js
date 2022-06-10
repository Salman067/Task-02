const express = require("express");

const { getHome, getProfile, updateProfile } = require("../controllers/user.controller");
const { checkLogin } = require("../middleware/authenticateLogin.middleware");

const router = express();

// get user home page
router.get("/home", checkLogin,  getHome);

// get user profile page
router.get("/Profile", checkLogin, getProfile);

// update profile
router.put("/updateProfile", checkLogin, updateProfile);

module.exports = router;