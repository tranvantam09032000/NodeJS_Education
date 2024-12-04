const Course = require('../models/course-model');
const {multipleMongooseToObject} = require('../../util/mongoose')
class SiteController {
    home(req, res, next) {
        Course.find({})
            .then(courses =>
                res.render('home', {courses: multipleMongooseToObject(courses)}))
            .catch(next);
    }

    search(req, res) {
        res.render("Search !")
    }
}

module.exports = new SiteController();