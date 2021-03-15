const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');

const catchErrors = require('../utils/catchErrors');

router.post('/',catchErrors(userController.createAUser));
router.post('/newsLetter',catchErrors(userController.sendNewsLetter));

module.exports = router;
