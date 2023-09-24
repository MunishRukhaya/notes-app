const User = require('../models/userModel');
const Note = require('../models/noteModel');
const getUid = require('./getUid')

module.exports = async (req, res) => {
    const uid = getUid();
    Note.deleteMany({ user_id: uid }).then(console.log("notes removed"));
    User.deleteOne({ _id: uid }).then(
        res
            .cookie("login", "")
            .status(400)
            .send({ message: `User with ID:${uid} has been deleted` })
    );
};