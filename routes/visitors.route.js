const express = require('express');
const router = express.Router();
const { visitors } = require('../controllers');
const bodyParser = require('body-parser');
router.use(bodyParser.json());


router.get('/',visitors.getTotalVisitorsForTheMonth)


module.exports = router;
