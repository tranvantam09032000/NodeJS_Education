const Course = require('../models/course-model');
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    myCourse(req, res, next) {
        Course.find({})
            .then(courses =>res.render("courses/my-courses", {courses: multipleMongooseToObject(courses)}))
            .catch((next));
    }

    formUpdateCourse(req, res, next) {
        Course.findById(req.params.id)
        .then(course =>res.render("courses/update", {course: mongooseToObject(course)}))
        .catch((next));
        
    }

    updateCourse(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() =>res.redirect('/'))
        .catch((error)=> next(error));
    }

    deleteCourse(req, res, next) {
        Course.deleteOne({_id: req.params.id})
        .then(() =>res.redirect('back'))
        .catch((error)=> next(error));
    }
}

module.exports = new MeController();