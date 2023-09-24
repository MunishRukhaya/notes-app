const Note = require('../models/noteModel');
const getUid = require('./getUid');

module.exports = async (req, res) => {
    const uid = getUid();
    const note = await Note.create({
        title: req.body.title,
        body: req.body.body,
        user_id: uid,
    });
    res.status(200).send({ message: `Note with ID: ${note._id} is created` });
};