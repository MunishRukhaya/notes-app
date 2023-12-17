const User = require('../models/userModel');
const Note = require('../models/noteModel');

module.exports = async (req, res) => {
    Note.deleteMany({ user_id: req.cookies.uid }).then(console.log("notes removed"));
    User.deleteOne({ _id: req.cookies.id }).then(
        res
            .cookie("login", "")
            .status(400)
            .send({ message: `User with ID:${uid} has been deleted` })
    );
};