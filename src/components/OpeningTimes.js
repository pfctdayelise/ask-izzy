/* @flow */

import moment from "moment";
import mui from "material-ui";
import React from "react";
import _ from "underscore";

import fixtures from "../../fixtures/services";
import ScreenReader from "./ScreenReader";
import colors from "../constants/theme";
var palette = colors.getPalette();

import icons from '../icons';

function fixture(nowOpen: ?Boolean, openingHours: issOpeningHours, time: ?Moment): Object {
    // Moment is fixed to Wednesday 15/9/2015 around 1pm
    time |= moment(1441768118000)
    return {
        object: {now_open: {now_open: nowOpen}, opening_hours: openingHours},
        moment: function() {return moment(time);},
    };
}

class OpeningTimes extends React.Component {

    // flow:disable not supported yet
    static propTypes = {
        object: React.PropTypes.object.isRequired,
        moment: React.PropTypes.function,
    };

    // flow:disable
    static defaultProps = {
        moment: moment,
    };

    // flow:disable not supported yet
    static sampleProps = {
        open: fixture(true,  [{
            day: "Wednesday",
            open: "10:30:00",
            close: "15:00:00",
        },]),
        closed: fixture(false, [{
            day: "Thursday",
            open: "14:30:00",
            close: "15:00:00",
        },]),
        "Closed for days": fixture(false, [{
            day: "Friday",
            open: "14:30:00",
            close: "15:00:00",
        },]),
        "Open later today": fixture(false, [{
            day: "Wednesday",
            open: "14:30:00",
            close: "15:00:00",
        },]),
        "Closed earlier today": fixture(false, [{
            day: "Wednesday",
            open: "8:30:00",
            close: "10:00:00",
        },]),
        unsure: fixture(null,  [{
            day: "Wednesday",
            open: "14:30:00",
            close: "15:00:00",
            note: "Every second Wednesday",
        },]),
        invalid: fixture(null,  [{
            day: "Wednesday",
            open: "24:30:00",
            close: "25:00:00",
            note: "Every second Wednesday after 24 hours",
        }]),
    };

    findOpeningHours(day: Moment): Object {
        return _(this.props.object.opening_hours)
            .findWhere({day: day.format('dddd')}) || {};
    }

    formatTime(t: Moment): string {
        return moment(t, 'HH:mm:ss').format('h:mm A');
    }

    ifTime(strings: Array<string>, ...values: Array<any>): string {
        if (_(values).contains(undefined)) {
            return "";
        }
        var timeValues = values.map(function(v) {
            if (moment.isMoment(v)) {
                return this.formatTime(v);
            }
            return v;
        });
        if (_(timeValues).contains('Invalid date')) {
            return "";
        }
        return String.raw(strings, ...timeValues);
    }

    renderOpen(): React.Element {
        var today = this.openingHoursInDays(0); // Get todays opening hours
        return (
            <span className="until">
                <span className="open">
                    Open
                </span> {this.ifTime`until ${today.close}`}
            </span>
        );
    }

    renderClosed(): React.Element {
        var nextOpenDay = this.nextOpenInDays();
        var nextOpen = this.openingHoursInDays(nextOpenDay);

        if (_.isEmpty(nextOpen)) {
            return '';
        }

        var time = this.formatTime(nextOpen.open);
        var day = this.ifTime`${nextOpen.day} ${time}`;
        if (nextOpenDay == 0) {
            var closeTime = moment(nextOpen.close, "HH:mm:ss");
            var alreadyClosed = closeTime.diff() < 0;
            if (alreadyClosed) {
                day = this.ifTime`next ${nextOpen.day} ${time}`;
            } else {
                day = this.ifTime`today ${time}`;
            }
        } else if (nextOpenDay == 1) {
            day = this.ifTime`tomorrow ${time}`;
        } else if (nextOpenDay >= 7) {
            day = this.ifTime`next ${nextOpen.day} ${time}`;
        }

        return (
            <span className="until">
                <span className="closed">
                    Closed
                </span> until {day}
            </span>
        );
    }

    renderUnsure(): React.Element {
        var nextOpen = this.openingHoursInDays(this.nextOpenInDays());
        var open = this.formatTime(nextOpen.open);
        var close = this.formatTime(nextOpen.close);
        return (
            <span className="when">
                { nextOpen.day }
                {this.ifTime` from ${open} to ${close} `}
                ({ nextOpen.note })
            </span>
        );
    }

    nextOpenInDays(): number {
        var day;
        for (day = 0; day <= 7; day++) {
            /* look for the next day the service is open */
            var nextOpen = this.openingHoursInDays(day);
            if (_.isEmpty(nextOpen)) {
                continue;
            }

            return day;
        }

        return -1;
    }

    openingHoursInDays(days: number): Object {
        return this.findOpeningHours(
            this.props.moment().add(days, 'd')
        );
    }

    render(): React.Element {
        var open = this.props.object.now_open.now_open;

        var renderMethod = this.renderUnsure;
        if (open === true) {
            renderMethod = this.renderOpen;
        } else if (open === false) {
            renderMethod = this.renderClosed;
        }

        return (
            <div className="OpeningTimes">
                <ScreenReader>
                    <h4>Opening times</h4>
                </ScreenReader>
                <icons.Clock className="ColoredIcon brand-text-dark" />
                {' '}
                { renderMethod.apply(this) }
            </div>
        );

    }
}

export default OpeningTimes;
