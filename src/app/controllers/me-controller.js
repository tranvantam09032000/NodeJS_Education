const Course = require('../models/course-model');
const {multipleMongooseToObject} = require('../../util/mongoose')
class MeController {
    myCourse(req, res, next) {
        Course.find({})
            .then(courses =>
                res.render("courses/my-courses", {courses: multipleMongooseToObject(courses)})
            ).catch((error)=> {
            next(error);
        });
    }

    updateCourses(req, res, next) {
        res.send("update")
    }
}

module.exports = new MeController();