const express = require('express');
const router = express.Router();

const meController = require('../app/controllers/me-controller');

router.get('/courses', meController.myCourse);
router.put('/courses/:id/store', meController.updateCourse);
router.get('/courses/:id', meController.formUpdateCourse);

module.exports = router;