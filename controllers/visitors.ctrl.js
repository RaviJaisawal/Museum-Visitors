"use strict";
const _ = require('lodash');
const { visitors } = require('../services')

exports.getTotalVisitorsForTheMonth = async (req, res) => {
    const { query } = req;
    try {
        const { status, attendance } = await visitors.getTotalVisitorsForTheMonth(query);
        res.status(status).send({ success: true, attendance: attendance });
    } catch (err) {
        res.status(500).send({ success: false, msg: "Something went wrong in get Visitors.", err: err });
    }
}
