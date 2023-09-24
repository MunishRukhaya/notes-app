const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
        if (bcrypt.compareSync(req.body.password, existingUser.password)) {
            const uid = existingUser._id;
            const token = jwt.sign({ uid: uid }, process.env.JWT_KEY);
            res.cookie("login", token);
            res.status(200).json({ message: `Hello ${existingUser.name}, Welcome` });
        } else {
            res.status(401).json({ message: "Invalid password" });
        }
    } else {
        res.status(401).json({ message: "User does not exist" });
    }
};