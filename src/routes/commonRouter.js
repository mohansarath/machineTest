const express = require('express');

const router = express.Router();

const commonController = require('../controllers/commonController');

const catchErrors = require('../utils/catchErrors');

router.get('/', catchErrors(commonController.healthCheck));

module.exports = router;
