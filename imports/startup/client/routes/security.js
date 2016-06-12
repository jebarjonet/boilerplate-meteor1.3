import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
import {Roles} from "meteor/alanning:roles";

import {Notifier} from "../../../startup/services/notifier.service";

export const privateRoutes = FlowRouter.group({
    prefix: "/private",
    triggersEnter: [function () {
        if (!Meteor.userId()) {
            Notifier.error("Your are not allowed to visit this page");
            FlowRouter.go(FlowRouter.path("public"));
        }
    }]
});