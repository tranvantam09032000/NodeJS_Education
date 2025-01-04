const Course = require('../models/course-model');
const {mongooseToObject, multipleMongooseToObject} = require('../../util/mongoose')

class MeController {
    myCourses(req, res, next) {
        Promise.all([
            Course.find({}).sortStable(req), 
            Course.countDocumentsWithDeleted({deleted: true})
        ]).then(([courses, count]) =>
            res.render("course/my-courses", {courses: multipleMongooseToObject(courses), count: count}))
            .catch((next));
    }

    formCreate(req, res, next) {
        res.render("course/create")
    }

    create(req, res, next) {
        const formData = {...req.body};
        formData.image = `http://img.youtube.com/vi/${req.body.videoId}/0.jpg`;
        const course = new Course(formData);
        course.save().then(()=> res.redirect('/me/courses'))
            .catch((next));
    }

    formUpdateCourse(req, res, next) {
        Course.findById(req.params.id)
        .then(course =>res.render("course/update", {course: mongooseToObject(course)}))
        .catch((next));
        
    }

    updateCourse(req, res, next) {
        Course.updateOne({_id: req.params.id}, req.body)
        .then(() =>res.redirect('/me/courses'))
        .catch((error)=> next(error));
    }

    deleteCourse(req, res, next) {
        Course.delete({_id: req.params.id})
        .then(() =>res.redirect('back'))
        .catch((error)=> next(error));
    }

    trashCourses(req, res, next) {
        Course.findWithDeleted({deleted:true})
            .then(courses =>
                res.render("course/trash-courses", {courses: multipleMongooseToObject(courses)}))
            .catch((next));
    }

    restoreCourse(req, res, next) {
        Course.restore({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch((error)=> next(error));
    }

    destroyCourse(req, res, next) {
        Course.deleteOne({_id: req.params.id})
            .then(() =>res.redirect('back'))
            .catch((error)=> next(error));
    }

    handleFormAction(req, res, next) {
        switch(req.body.action) {
            case "delete": {
                Course.delete({_id: {$in: req.body.courseIds}})
                .then(() =>res.redirect('back'))
                .catch((error)=> next(error));
                break;
            }
            default: {
                res.json({message: "Action is invalid"});
            }
        }
    }
}

module.exports = new MeController();