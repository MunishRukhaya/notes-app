const Note = require('../models/noteModel');

module.exports = (req, res)=> {
    Note.deleteOne({ _id: req.params._id }).then(
        res
            .status(200)
            .send({ message: `Note with ID:${req.params._id} has been deleted` })
    );
}