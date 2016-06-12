import {_} from "lodash";
import {sAlert} from "meteor/juliancwirko:s-alert";

/**
 * Usage on client : Notifier.success("my text") (or .error, .warning, .info)
 * Having {{> sAlert}} somewhere on the page
 */
export const Notifier = (function () {
    let types = "error warning info success".split(" "),
        functions = {};

    _.forEach(types, function (type) {
        functions[type] = function (input, options) {
            let text = input;

            // if error object
            if (_.isObject(input)) {
                console.error(input);
                if (input.reason) {
                    text = input.reason;
                } else if (_.isString(input)) {
                    text = input;
                } else {
                    return;
                }
            }

            return notify(text, type, options);
        };
    });

    return functions;

    function notify(text, type, options) {
        type = type ? type : "error";

        options = options || {};

        if (!options.timeout) {
            const wordsPerMinute = 250,
                readingTime = _.words(text).length * 60000 / wordsPerMinute;
            options.timeout = _.max([2000, readingTime]);
        }

        return sAlert[type](text, options);
    }
})();