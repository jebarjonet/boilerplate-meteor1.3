import {Meteor} from "meteor/meteor";
import {Mongo} from "meteor/mongo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const Posts = new Mongo.Collection("posts");

Posts.deny({
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

Posts.schema = new SimpleSchema({
    authorId: {
        type: String
    },
    title: {
        type: String
    },
    text: {
        type: String
    },
    createdAt: {
        type: Date,
        optional: true,
        autoValue: function () {
            if (!this.isSet && this.isInsert) {
                return new Date();
            }
        }
    },
    lastUpdateAt: {
        type: Date,
        optional: true,
        autoValue: function () {
            return new Date();
        }
    }
});

Posts.attachSchema(Posts.schema);

Posts.publicFields = {
    authorId: 1,
    title: 1,
    text: 1,
    createdAt: 1,
    lastUpdateAt: 1
};

Posts.helpers({
    author() {
        return Meteor.users.findOne(this.authorId);
    }
});