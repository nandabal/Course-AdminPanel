const mongoose = require('mongoose');

const schema = mongoose.Schema({
    cId: String,
    cName: String,
    cDuration: String,
    feedback: {
        rating: Number,
        comments: String
    }
});

const courseModel = mongoose.model('course', schema);
module.exports = courseModel;
