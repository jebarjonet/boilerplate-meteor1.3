import {ValidatedMethod} from "meteor/mdg:validated-method";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {LoggedInMixin} from "meteor/tunifight:loggedin-mixin";
import {simpleSchemaMixin} from "meteor/rlivingston:simple-schema-mixin";

ValidatedMethod.mixins = {};

/**
 * Check if user is logged in
 * @param options
 * @returns {*}
 */
ValidatedMethod.mixins.isLoggedIn = function (options) {
    options.checkLoggedInError = {
        error: "not-logged",
        message: "You need to be logged in to call this method",
        reason: "You need to login"
    };

    return LoggedInMixin(options);
};

/**
 * Check if user is admin
 * @param options
 */
ValidatedMethod.mixins.isAdmin = function (options) {
    options.checkRoles = {
        roles: ["admin"],
        rolesError: {
            error: "not-allowed",
            message: "You are not allowed to call this method",
            reason: "You are not allowed to call this method"
        }
    };

    return ValidatedMethod.mixins.isLoggedIn(options);
};

/**
 * Check if was initiated by server
 * @param options
 */
ValidatedMethod.mixins.isServer = function (options) {
    const runFunc = options.run;

    options.run = function (args) {
        if (this.connection !== null) {
            throw new Meteor.Error(403, "You are not allowed to call this method");
        }
        return runFunc.call(this, args);
    };

    return options;
};

/**
 * Check schema versus plain object (ex: from Autoform "method")
 * @param options
 * @returns {*}
 */
ValidatedMethod.mixins.checkSchema = function (options) {
    return simpleSchemaMixin(options);
};

/**
 * Check schema versus modifier object (ex: from Autoform "method-update")
 * doc : {_id: documentId, modifier: Object}
 * @param options
 * @returns {*}
 */
ValidatedMethod.mixins.checkSchemaModifier = function (options) {
    let simpleSchema;
    if (!options.schema || options.schema === null) {
        simpleSchema = new SimpleSchema({});
    } else if (options.schema instanceof SimpleSchema) {
        simpleSchema = options.schema;
    } else {
        simpleSchema = new SimpleSchema(options.schema);
    }

    options.validate = function (doc) {
        simpleSchema.validate(doc.modifier, {modifier: true});
    };

    return options;
};