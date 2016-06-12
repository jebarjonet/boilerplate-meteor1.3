import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
import {Roles} from "meteor/alanning:roles";

import {privateRoutes} from "./security";

import "./private/posts.routes";

import "../../../ui/views/layout";
import "../../../ui/views/private/index";

privateRoutes.route("/", {
    name: "private",
    action: function () {
        BlazeLayout.render("layout", {main: "private.index"});
    }
});