const Course = require('../models/course-model');
const {mongooseToObject} = require('../../util/mongoose')

class CoursesController {
    show(req, res, next) {
        Course.findOne({slug: req.params.slug})
        .then((course) => res.render("courses/show", {course: mongooseToObject(course)}))
        .catch(next);
    }

    formCreate(req, res, next) {
        res.render("courses/create")
    }

    create(req, res, next) {
        const formData = req.body
        formData.image = `http://img.youtube.com/vi/${req.body.videoId}/0.jpg`;
        const course = new Course(formData);
        course.save().then(()=> res.redirect('/'))
        .catch((next));
    }
}

module.exports = new CoursesController();