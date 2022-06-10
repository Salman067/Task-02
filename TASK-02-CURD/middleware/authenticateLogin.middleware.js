const jwt = require("jsonwebtoken");

const checkLogin = (req, res, next) => {

    const { authorization } = req.headers;
    const jwtSecretKey = process.env.JWT_SECRET_KEY

    try {
        const token = authorization.split(' ')[1];
        const data = jwt.verify(token, jwtSecretKey);
        const { username, userid } = data;

        req.username = username;
        req.userid = userid;

        next();
    } catch (error) {
        next("Authentication failure!");
    }
}

module.exports = { checkLogin };