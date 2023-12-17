const Note = require('../models/noteModel');

module.exports = async (req, res) => {
    const note = await Note.create({
        title: req.body.title,
        body: req.body.body,
        user_id: req.cookies.uid
    });
    res.status(200).send({ message: `Note with ID: ${note._id} is created` });
};