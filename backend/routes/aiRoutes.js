const express = require('express');
const router = express.Router();
const { resumeFeedback, jobMatch } = require('../controllers/aiController');
const { protect } = require('../middleware/authMiddleware');

router.post('/resume-feedback', protect, resumeFeedback);
router.post('/match', protect, jobMatch);

module.exports = router;
