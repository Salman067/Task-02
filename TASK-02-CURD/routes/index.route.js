const express = require("express");
const { getIndexPage } = require("../controllers/index.controller");


const router = express.Router();

// get index page
router.get("/", getIndexPage);

module.exports = router;