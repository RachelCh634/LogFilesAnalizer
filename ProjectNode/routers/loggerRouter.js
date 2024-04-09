const express = require('express');
const multer = require('multer');
const router = express.Router();
const { parseLogFile } = require('../controllers/loggerController');
router.get('/',parseLogFile);
module.exports = router;