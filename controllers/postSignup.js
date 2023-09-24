const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports = async (req, res) => {
    const existingUser = await User.findOne({ email: req.body.email });
    if (!existingUser) {
        if (req.body.password === req.body.confirmPassword) {
            const hashPass = await bcrypt.hash(req.body.password, 10);
            const data = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: hashPass,
            });
            res.status(200).json(data);
        } else {
            res.status(401).json({ message: "Password and confirm passowords do not match" });
        }
    } else {
        res.status(403).json({ message: "User already exists" });
    }
};