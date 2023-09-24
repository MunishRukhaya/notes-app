const Note = require('../models/noteModel');
const getUid = require('./getUid');

module.exports = async (req, res, uid) => {
    // const uid = getUid();
    const userNotes = await Note.find({ user_id: uid });
    console.log(userNotes);
    res.status(200).send(userNotes);
};