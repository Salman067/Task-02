const path = require("path");

const cache = require("node-cache");

// get index page
const getIndexPage = (req, res) => {

    res.sendFile(path.join(__dirname + "/../views/index.html"));

};

module.exports = { getIndexPage };

