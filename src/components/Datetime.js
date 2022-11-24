const Datetime = {};
Datetime.MS_IN_DAY = 864e5;
Datetime.MS_IN_HOUR = 36e5;
Datetime.MS_IN_MIN = 6e4;

/**
 * Return timestamp
 * @param date
 * @returns {number}
 */
Datetime.time = function (date) {
    return date instanceof Date ? date.getTime() : (new Date).getTime()
};

/**
 * Add days to some date
 * @param day           number of days. 0.04 - 1 hour, 0.5 - 12 hour, 1 - 1 day
 * @param dateStart     type Date, start date
 * @returns {*}  type Date
 */
Datetime.addDays = function (day, dateStart) {
    const date = dateStart ? new Date(dateStart) : new Date();
    date.setTime(date.getTime() + (day * 86400000));
    return date;
};

/**
 * Time between Dates
 * <pre>
 *     var from = new Date('2016-08-01 20:30');
 *     var to = new Date('2016-08-10 07:55');
 *     .Date.betweenDates(from, to); // Object { day: 8, hour: 11, minute: 25 }
 * </pre>
 * @param dateFrom
 * @param dateTo
 * @returns {{day: number, hour: number, minute: number}}
 */
Datetime.betweenDates = function (dateFrom, dateTo) {
    dateFrom = dateFrom || new Date();
    dateTo = dateTo || new Date();
    let diffMs = (dateTo - dateFrom),
        diffDays = Math.round(diffMs / 864e5),
        diffHrs = Math.round((diffMs % 864e5) / 36e5),
        diffMin = Math.round(((diffMs % 864e5) % 36e5) / 6e4);
    return {day: diffDays, hour: diffHrs, minute: diffMin};
};

/**
 * Convert date string to Date Object
 * yy - the year as a two-digit number ( 00 to 99 );
 * YY - the year as a four-digit number ( 1900-9999 );
 * mm - the month as a number with a leading zero ( 01 to 12 ) ( 1 to 12 );
 * dd - the day as a number with a leading zero ( 01 to 31 ) ( 1 to 31 );
 * hh HH - the hour ( 00 to 11 ) ( 00 to 23 ) ( 1 to 12 ) ( 0 to 23 );
 * ii - the minute as a number with a leading zero ( 00 to 59 );
 * ss - the second as a number with a leading zero ( 00 to 59 );
 * aa - displays am (for times from midnight until noon) and pm (for times from noon until midnight);
 *
 * Datetime.strToDate('12.05.2017 12:30:25', 'mm.dd.YY HH:ii:ss')
 * Datetime.strToDate('12/05/2017', 'mm/dd/YY')
 * Datetime.strToDate('12/5/2017', 'mm/dd/YY', true)
 * @param date
 * @param format
 * @param utc
 * @returns {Date}
 */
Datetime.strToDate = function (date, format, utc) {
    const set = [0, 0, 1, 0, 0, 0];
    const temp = date.match(/[a-zA-Z]+|[0-9]+/g);
    const mask = format.match(/[a-zA-Z]{2}/g);
    for (let i = 0; i < mask.length; i++) {
        switch (mask[i]) {
            case "dd":
                set[2] = temp[i] || 1;
                break;
            case "mm":
                set[1] = (temp[i] || 1) - 1;
                break;
            case "yy":
                set[0] = temp[i] * 1 + (temp[i] > 50 ? 1900 : 2000);
                break;
            case "hh":
            case "HH":
                set[3] = temp[i] || 0;
                break;
            case "ii":
                set[4] = temp[i] || 0;
                break;
            case "YY":
                set[0] = temp[i] || 0;
                break;
            case "aa":
                set[3] = set[3] % 12 + ((temp[i] || '').toLowerCase() === 'am' ? 0 : 12);
                break;
            case "ss":
                set[5] = temp[i] || 0;
                break;
            default:
                break;
        }
    }
    if (utc) {
        return new Date(Date.UTC(set[0], set[1], set[2], set[3], set[4], set[5]));
    }
    return new Date(set[0], set[1], set[2], set[3], set[4], set[5]);
};

export default Datetime;

/*
export default {
    MS_IN_DAY: Datetime.MS_IN_DAY,
    MS_IN_HOUR: Datetime.MS_IN_HOUR,
    MS_IN_MIN: Datetime.MS_IN_MIN,
    time: Datetime.time,
    addDays: Datetime.addDays,
    betweenDates: Datetime.betweenDates,
    strToDate: Datetime.strToDate,
};
*/
