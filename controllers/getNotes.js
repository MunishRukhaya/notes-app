const Note = require('../models/noteModel');

module.exports = async (req, res, uid) => {
    const userNotes = await Note.find({ user_id: req.cookies.uid });
    console.log(userNotes);
    res.status(200).send(userNotes);
};