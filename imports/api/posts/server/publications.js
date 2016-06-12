import {Meteor} from "meteor/meteor";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {Roles} from "meteor/alanning:roles";
import {check} from "meteor/check";

import {Posts} from "../posts";

Meteor.publishComposite("private.posts.one", function (postId) {
    check(postId, String);

    if (!this.userId) {
        return;
    }

    return {
        find() {
            return Posts.find(postId, {
                limit: 1
            });
        }
    };
});

Meteor.publishComposite("posts.one", function (postId) {
    check(postId, String);

    return {
        find() {
            return Posts.find(postId, {
                limit: 1,
                fields: Posts.publicFields
            });
        }
    };
});

Meteor.publishComposite("posts.all", function () {
    return {
        find() {
            return Posts.find({}, {
                fields: Posts.publicFields
            });
        }
    };
});