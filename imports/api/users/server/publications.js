import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "meteor/aldeed:simple-schema";
import {_} from "lodash";

Meteor.publishComposite("users.some", function (usersIds = []) {
    return {
        find() {
            check(usersIds, [String]);
 
            return Meteor.users.find({
                _id: {
                    $in: usersIds
                }
            }, {
                fields: Meteor.users.publicFields
            });
        }
    };
});

Meteor.publishComposite("users.current", function () {
    return {
        find() {
            return Meteor.users.find(this.userId, {
                limit: 1
            });
        }
    };
});