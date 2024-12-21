const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/me-controller');

router.get('/courses', meController.myCourse);
router.get('/trash/courses', meController.trashCourses);
router.put('/courses/:id/store', meController.updateCourse);
router.patch('/courses/:id/restore', meController.restoreCourse);
router.delete('/courses/:id/delete', meController.deleteCourse);
router.delete('/courses/:id/destroy', meController.destroyCourse);
router.get('/courses/:id', meController.formUpdateCourse);

module.exports = router;