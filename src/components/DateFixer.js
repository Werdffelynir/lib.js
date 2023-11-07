/**

 // set type format. Default: 'yyyy.mm.dd' `format(value)`
 // Format can use tags: yyyy, yy, mm, dd, hh, ii, ss
 format(yyyy.mm.dd)
 format(yyyy.mm.dd hh:ii:ss)
 format(yyyy/mm/dd hh-ii-ss)

 // mutation `add (method, value)`
 add ('seconds', 10)
 add ('minutes', 10)
 add ('hours', 10)
 add ('days', 10)
 add ('months', 10)
 add ('years', 10)

 // mutation `sub (method, value)`
 sub ('seconds', 10)
 sub ('minutes', 10)
 sub ('hours', 10)
 sub ('days', 10)
 sub ('months', 10)
 sub ('years', 10)

 // Copy date object
 copy()

 // getters
 now()
 day()
 month()
 year()
 hours()
 minutes()
 seconds()
 time()
 toDateString()
 toDate()

 // private
 currentValue
 currentFormat
 *
 * @param format
 * @param data
 * @return {Date|string|*|{add(*, *=): this, sub(*=, *): *, hours(): string, year(): string, minutes(): string, toDate(): *, format(*): *, toDateString(): *, currentFormat: string, seconds(): string, month(): string, now(): *, time(): *, copy(): *, day(): string, currentValue: (*|Date)}|number}
 * @constructor
 */
const DateFixer = function (data, format)
{
    const fixedZero = (data) => String(data).length === 1 ? '0' + data : String(data);

    if (typeof data === "string") {
        data = DateFixer.parse(data, format).toDate();
    }

    /*
     * Format: yyyy, yy, mm, dd, hh, ii, ss
     */
    return {
        currentValue: data || new Date(),
        currentFormat: format || 'yyyy.mm.dd',
        now () { return this.currentValue = new Date() },
        day(value) {
            if (value) {this.set('day', value); return this.day()}
            return fixedZero(this.currentValue.getDate())
        },
        month (value) {
            if (value) {this.set('month', value - 1); return this.month()}
            return fixedZero(this.currentValue.getMonth() + 1);
        },
        year (value) {
            if (value) {this.set('year', value); return this.year()}
            return fixedZero( this.currentValue.getFullYear());
        },
        hours (value) {
            if (value) {this.set('hours', value); return this.hours()}
            return fixedZero(this.currentValue.getHours());
        },
        minutes (value) {
            if (value) {this.set('minutes', value); return this.minutes()}
            return fixedZero(this.currentValue.getMinutes());
        },
        seconds (value) {
            if (value) {this.set('value', value); return this.value();}
            return fixedZero(this.currentValue.getSeconds());
        },
        set (method, value) {
            switch (method) {
                case 's':
                case 'second':
                case 'seconds':
                    this.currentValue.setSeconds(parseInt(value)); break;
                case 'i':
                case 'minute':
                case 'minutes':
                    this.currentValue.setMinutes(parseInt(value)); break;
                case 'h':
                case 'hour':
                case 'hours':
                    this.currentValue.setHours(parseInt(value)); break;
                case 'd':
                case 'day':
                case 'days':
                    this.currentValue.setDate(parseInt(value)); break;
                case 'm':
                case 'month':
                case 'months':
                    this.currentValue.setMonth(parseInt(value)); break;
                case 'y':
                case 'year':
                case 'years':
                    this.currentValue.setFullYear(parseInt(value)); break;
            }
            return this;
        },
        add (method, value) {
            switch (method) {
                case 's':
                case 'second':
                case 'seconds':
                    this.currentValue.setSeconds(this.currentValue.getSeconds() + parseInt(value)); break;
                case 'i':
                case 'minute':
                case 'minutes':
                    this.currentValue.setMinutes(this.currentValue.getMinutes() + parseInt(value)); break;
                case 'h':
                case 'hour':
                case 'hours':
                    this.currentValue.setHours(this.currentValue.getHours() + parseInt(value)); break;
                case 'd':
                case 'day':
                case 'days':
                    this.currentValue.setDate(this.currentValue.getDate() + parseInt(value)); break;
                case 'm':
                case 'month':
                case 'months':
                    this.currentValue.setMonth(this.currentValue.getMonth() + parseInt(value)); break;
                case 'y':
                case 'year':
                case 'years':
                    this.currentValue.setFullYear(this.currentValue.getFullYear() + parseInt(value)); break;
            }
            return this;
        },
        sub (method, value) {
            return this.add(method, (value > 0) ? -value : value);
        },
        format (value) { return this.currentFormat = value },
        time () { return this.currentValue.getTime() },
        toDateString () {
            const map = {
                'yyyy': this.year(),
                'yy': this.year().substring(2, 4),
                'mm': this.month(),
                'dd': this.day(),
                'hh': this.hours(),
                'ii': this.minutes(),
                'ss': this.seconds(),
            };
            const keys = Object.keys(map);
            let date = this.currentFormat;
            keys.forEach((key) => {
                const re = new RegExp(key, 'gi');
                date = date.replace(re, map[key]);
            });
            return date;
        },
        toDate () { return this.currentValue },
        copy () {
            const date = new Date();
            const cloned = Object.assign({}, this);
            date.setTime(cloned.currentValue.getTime());
            cloned.currentValue = date;
            return cloned;
        },
        fixedZero,
        fixedDate (date, separator) {
            const numbers = date.match(/[\d]+/g);
            numbers.forEach((value, index) => {
                numbers[index] = fixedZero(value)
            })
            separator = separator || this.currentFormat.match(/[^\w]+/g)[0] || '.';
            return numbers.join(separator);
        },
    };
};

/**
 * DateFixer.parse('2020.01.01', 'yyyy.mm.dd');
 *
 * @param dateString
 * @param format
 * @return {Date|string|*|{add, (*, *=): this, sub, (*=, *): *, hours, (): string, year, (): string, minutes, (): string, toDate, (): *, format, (*): *, toDateString, (): *, currentFormat: string, seconds, (): string, month, (): string, now, (): *, time, (): *, copy, (): *, day, (): string, currentValue: (*|Date)}|number}
 */
DateFixer.parse = function (dateString, format) {
    if (format) {
        const dateFixer = DateFixer();
        const map = {
            'yyyy': (value) => dateFixer.year(value),
            'yy': (value) => dateFixer.year(String((new Date()).getFullYear()).substring(2, 4) + value),
            'mm': (value) => dateFixer.month(value),
            'dd': (value) => dateFixer.day(value),
            'hh': (value) => dateFixer.hours(value),
            'ii': (value) => dateFixer.minutes(value),
            'ss': (value) => dateFixer.seconds(value),
        };
        const keys = Object.keys(map);

        keys.forEach((key) => {
            const re = new RegExp(key, 'gi');
            const result = re.exec(format);
            if (result && result.input) {
                const func = result[0];
                const start = result.index;
                const end = start + (func.length);
                const value = dateString.substring(start, end);

                if (func === 'yy' && dateString.indexOf('yyyy') !== false) return;

                map[func](value);
            }
        });
        return dateFixer;
    }
}

export default DateFixer;
