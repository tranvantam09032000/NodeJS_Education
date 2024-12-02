const Course = require('../models/course-model')
class SiteController {
    home(req, res) {
        Course.find({}).then(courses => {
            res.json(courses);
        })
            .catch(err => {
                res.status(500).json({ error: 'Internal Server Error' });
            });
    }

    search(req, res) {
        res.send("Search !")
    }
}

module.exports = new SiteController();