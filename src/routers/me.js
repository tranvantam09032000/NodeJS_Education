const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/me-controller');

router.get('/courses', meController.myCourse);
router.get('/courses/:id', meController.updateCourses);

module.exports = router;