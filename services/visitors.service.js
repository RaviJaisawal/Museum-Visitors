const _ = require('lodash');
const axios = require('axios');

exports.getTotalVisitorsForTheMonth = async (query) => {

    let attendance = {};
    let data;
    let { date, ignore } = query;
    date = Number.parseInt(date);

    let response = await axios.get('https://data.lacity.org/resource/trxm-jn3c.json');
    const { status, data: visitors } = response;
    if (status === 200)
        data = _.filter(visitors, (visitor) => new Date(visitor.month).getTime() === date);
    if (data && data.length)
        attendance = getHighesLowestIgnoredVisitors(data[0], ignore)

    return { status, attendance };
};

function getHighesLowestIgnoredVisitors(data, ignore) {
    let highest, lowest, ignored;
    let total = 0;
    const VisitorDate = new Date(data.month);
    const month = VisitorDate.toLocaleString('default', { month: 'short' })
    const year = VisitorDate.getUTCFullYear()

    _.forEach(data, (value, key) => {
        value = Number.parseInt(value)
        if (key !== 'month' && ignore !== key) {
            //museum with the highest number of visitors, not counting the ignored museum
            if (_.isEmpty(highest)) {
                highest = {
                    museum: key,
                    visitors: value
                }
            } else {
                if (highest.visitors < value) {
                    highest.museum = key;
                    highest.visitors = value;
                }
            }

            //museum with the lowest number of visitors, not counting the ignored museum
            if (_.isEmpty(lowest)) {
                lowest = {
                    museum: key,
                    visitors: value
                }
            } else {
                if (lowest.visitors > value) {
                    lowest.museum = key;
                    lowest.visitors = value;
                }
            }

            //total visitors for the month, not counting the ignored museum
            total += value;
        }

        //ignored museum 
        if (ignore === key) {
            ignored = {
                museum: key,
                visitors: value
            }
        }
    })
    //create response object
    attendance = { month, year, highest, lowest, ignored, total }
    return attendance;
}