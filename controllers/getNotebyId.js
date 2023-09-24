const Note = require('../models/noteModel');

module.exports = async (req, res) => {
    const note = await Note.findOne({ _id: req.params._id });
    res.status(200).send(note);
};