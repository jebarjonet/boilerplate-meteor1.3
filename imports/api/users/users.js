import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";

Meteor.users.deny({
    insert() {
        return true;
    },
    update() {
        return true;
    },
    remove() {
        return true;
    }
});

Meteor.users.schema = new SimpleSchema({
    username: {
        type: String,
        min: 4,
        max: 30
    },
    emails: {
        type: [Object],
        optional: true
    },
    "emails.$.address": {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    "emails.$.verified": {
        type: Boolean
    },
    createdAt: {
        type: Date,
        optional: true
    },
    lastConnectionAt: {
        type: Date,
        optional: true
    },
    services: {
        type: Object,
        optional: true,
        blackbox: true
    },
    roles: {
        type: [String],
        optional: true
    },
    disabled: {
        type: Boolean,
        optional: true
    },
    heartbeat: {
        type: Date,
        optional: true
    }
});

Meteor.users.attachSchema(Meteor.users.schema);

Meteor.users.publicFields = {
    disabled: 1
};

Meteor.users.helpers({
    isAdmin() {
        return Roles.userIsInRole(this._id, "admin");
    }
});