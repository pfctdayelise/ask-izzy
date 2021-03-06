/*
 * Step definitions for date/time related steps
 */

/* @flow */
/* eslint-disable no-use-before-define, no-native-reassign */

import Yadda from "yadda";
import fs from "fs";
import moment from "moment";

import unpromisify from "../support/yadda-promise";

module.exports = (function() {
    return Yadda.localisation.English.library()
        .given("it is late on $STRING", unpromisify(changeDay));
})();

async function changeDay(day: string): Promise<void> {
    var time = moment()
        .day(day)
        .startOf("day")
        .add(18, "h")
        .valueOf();
    var offset = new Date().getTimezoneOffset();
    var script = fs.readFileSync(`${__dirname}/../support/timeshift.js`,
                                 {encoding: "utf-8"});

    await this.driver.executeScript(script);
    await this.driver.executeScript((time, offset) => {
        Date = TimeShift.Date;
        TimeShift.setTimezoneOffset(offset);
        TimeShift.setTime(time);
        console.log("Mocked time to", new Date());
    }, time, offset);
}
