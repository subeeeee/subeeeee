/***
 *
 * @type {{getDays: (function(*=, *=)),
 * format: (function(*=, *=)),
 * formatDate: (function(*=, *=)),
  * getAllDays: (function(*)), getWeek: (function()), isDate: (function(*)), isTime: (function(*, *)), isDateTime: (function(*, *)), isLeapYear: (function(*))}}
 */
let dateUtil = {
    /**
     * 根据年月获取当前的日期
     * @param year
     * @param month
     * @returns {Array}
     */
    getDays(year, month) {
        let date = new Date();
        let week = ['一', '二', '三', '四', '五', '六', '日']
        let nday = [];
        let rday = [];
        rday.push(week)
        date.setFullYear(year);
        date.setMonth(month);
        date.setDate(0)
        let day = date.getDate();
        date.setDate(1);
        let weekday = date.getDay();

        for (let i = 1; i < weekday; i++) {
            nday.push('')
        }

        for (let i = 1; i <= day; i++) {
            nday.push(i);
            if (nday.length == 7) {
                rday.push(nday);
                nday = [];
            }
        }

        return rday;

    },
    format(format, date) {
        console.log(date);
        let now = date || new Date();
        date = {
            "M+": now.getMonth() + 1,
            "d+": now.getDate(),
            "h+": now.getHours(),
            "m+": now.getMinutes(),
            "s+": now.getSeconds(),
            "q+": Math.floor((now.getMonth() + 3) / 3),
            "S+": now.getMilliseconds()
        };
        if (/(y+)/i.test(format)) {
            format = format.replace(RegExp.$1, (now.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        for (var k in date) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1
                    ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
            }
        }
        return format;
    },
    formatDate(date, fmt) {
        // console.log("date:" + date);
        // console.log("fmt:" + fmt);

          //如果不是时间格式
        if (!(date instanceof Date)) {
            let newDate = new Date();
            if (typeof (date)=='number') {
                newDate.setTime(date);
            }else {
                //1 时间带日期的 - /
                //日期跟时间分开
                let arr = date.split(' ');
                let y = M = d = h = m = s = 0;
                console.log("arr[0]:" + arr[0])
                let tdate = arr[0].split(/[-/]/);
                if (tdate.length == 1) {
                    newDate.setTime(parseInt(date) * 1000);
                }
                else {
                    y = tdate[0];
                    M = tdate[1];
                    d = tdate[2];
                    let time = arr[1].split(':');
                    if (time.length > 0) {
                        h = time[0];
                        m = time[1];
                        s = time[2];
                    }
                    newDate = new Date(y, M, d, h, m, s);
                }
            }
            date = newDate;
        }
        if (!fmt) {
            fmt = 'yyyy-MM-dd';
        }

        var o = {
            "M+": date.getMonth() + 1, //月份
            "d+": date.getDate(), //日
            "h+": date.getHours(), //小时
            "m+": date.getMinutes(), //分
            "s+": date.getSeconds(), //秒
            "q+": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
        for (var k in o)
            if (new RegExp("(" + k + ")").test(fmt))
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        return fmt;
    },
    /**
     * 获取本月的日历
     * @param oldDate
     * @returns {{nullLength: number, data: Array}}
     */
    getAllDays(oldDate) {
        let months = [1, 3, 5, 7, 8, 10, 12];
        //  console.log("getAllDays:" + date)
        let date = new Date();
        date.setTime(Date.parse(oldDate.toString()))
        // console.log('year:' + date.getFullYear() + ',M:' + date.getMinutes() + ',d:' + date.getDay)
        let nday = [];
        let rday = [];
        date.setDate(1)
        let weekday = 0; //第一天是星期几
        let day = months.includes((date.getMonth() + 1)) ? 31 : 30; //最后一天的日期
        if (date.getMonth() + 1 == 2) {
            day = this.isLeapYear(date.getFullYear()) ? 29 : 28;
        }
        //获取本月第一天是周几
        weekday = date.getDay();
        date.setDate(date.getDate() - weekday - 1);
        for (let i = 0; i < weekday; i++) {
            date.setDate(date.getDate() + 1);
            nday.push({date: date.getDate(), type: 'last-month'})
        }

        for (let i = 1; i <= day; i++) {
            nday.push({date: i});
            if (nday.length == 7) {
                rday.push(nday);
                nday = [];
            }
        }
        // console.log('nday:' + nday.length);
        if (nday.length > 0 && nday.length < 7) {
            let temp = 0;
            for (let i = nday.length; i < 7; i++) {

                temp++
                nday.push({date: temp, type: 'next-month'})
            }
            rday.push(nday);
        }
        return {nullLength: weekday, data: rday};
    },
    getWeek() {
        return ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
    },
    isDate(date) {
        let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
        let r = date.match(reg);
        if (r == null) {
            return false;
        } else {
            return true;
        }
    },
    isTime(time, format) {
        let reg = /^(\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (format == 'hh:ss') {
            reg = /^(\d{1,2}):(\d{1,2})$/;
        }
        let r = time.match(reg);
        if (r == null) {
            return false;
        } else {
            return true;
        }
    },
    isDateTime(datetime, format) {
        let reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        if (format == 'yyyy-mm-dd hh:ss') {
            reg = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2}) (\d{1,2}):(\d{1,2})$/;
        }
        let r = datetime.match(reg);
        if (r == null) {
            return false;
        } else {
            return true;
        }
    },
    isLeapYear(year) {
        var cond1 = year % 4 == 0;  //条件1：年份必须要能被4整除
        var cond2 = year % 100 != 0;  //条件2：年份不能是整百数
        var cond3 = year % 400 == 0;  //条件3：年份是400的倍数
        //当条件1和条件2同时成立时，就肯定是闰年，所以条件1和条件2之间为“与”的关系。
        //如果条件1和条件2不能同时成立，但如果条件3能成立，则仍然是闰年。所以条件3与前2项为“或”的关系。
        //所以得出判断闰年的表达式：
        return cond1 && cond2 || cond3;

    },

}

module.exports = {
    dateUtil
}