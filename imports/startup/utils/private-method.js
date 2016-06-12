import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {_} from "lodash";

/**
 * PrivateMethod class used to run server trusted functions only
 * Not accessible from client
 * Same format as ValidatedMethod
 * @param schema (Optional) schema or SimpleSchema
 * @param run function to run
 */
export class PrivateMethod {
    constructor({schema, run}) {
        if (schema) {
            if (schema instanceof SimpleSchema) {
                this.schema = schema;
            } else {
                this.schema = new SimpleSchema(schema);
            }
        }

        this.run = run;
    }

    call(args, callback) {
        // Accept calling with just a callback
        if (_.isFunction(args)) {
            callback = args;
            args = {};
        }

        if (this.schema) {
            this.schema.validate(args);
        }

        const result = _.isFunction(this.run) ? this.run(args) : undefined;

        if (_.isFunction(callback)) {
            callback(result);
        }

        return result;
    }
}