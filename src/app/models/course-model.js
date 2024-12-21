const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');
var slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const Course = new Schema({
    id: ObjectId,
    name: {type: String, default: ""},
    description: {type: String, default: ""},
    image: {type: String, default: ""},
    videoId: {type: String, default: ""},
    level: {type: String, default: ""},
    slug: {type: String, slug: "name", unique: true},
}, {
        timestamps: true
});

mongoose.plugin(slug);
Course.plugin(mongooseDelete, {
    deletedAt : true ,
    overrideMethods: 'all'
});

module.exports = mongoose.model('Course', Course);