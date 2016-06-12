import {Template} from "meteor/templating";
import {moment} from "meteor/momentjs:moment";
import {_} from "lodash";

/**
 * Format a date as HH:mm if today, DD/MM otherwise
 * @param date
 * @param format (Optional)
 */
Template.registerHelper("formatDate", function (date, format) {
    if (!date) {
        return;
    }

    date = moment(date);

    var sameDay = date.isSame(new Date(), "day"),
        sameYear = date.isSame(new Date(), "year");

    if (_.isString(format)) {
        return date.format(format);
    }

    if (sameDay) {
        return date.format("HH:mm");
    } else if (sameYear) {
        return date.format("DD/MM");
    } else {
        return date.format("DD/MM/YY");
    }
});

/**
 * Return true if the passed data is empty
 * @param data
 */
Template.registerHelper("isEmpty", function (data) {
    if (!data) {
        return true;
    }

    if (_.isArray(data) || _.isString(data)) {
        return !data.length;
    }

    return !data.count();
});