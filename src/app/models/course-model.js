const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    id: ObjectId,
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
    createdAt: {type: Date, default: Date.now()},
    updatedAt: {type: Date, default: Date.now()},
});

module.exports = mongoose.model('Course', Course);