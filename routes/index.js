"use strict";

const express =  require('express');
const router =  express.Router();
const visitor =  require('./visitors.route');

router.use('/visitors',visitor);

module.exports = router;