const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if (req.cookies.login) {
        const isVerified = jwt.verify(req.cookies.login, process.env.JWT_KEY);
        if (isVerified) {
            next();
        } else {
            res.status(401).json({ message: "User not verified" });
        }
    } else {
        res.status(401).json({ message: "User not logged in" });
    }
};