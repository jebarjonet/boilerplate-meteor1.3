import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";

import "./layout.html";

Template["layout"].events({
    "click .js-logout"() {
        Meteor.logout();
        FlowRouter.go("public");
    }
});
