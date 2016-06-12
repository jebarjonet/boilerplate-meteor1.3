import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";
import {Roles} from "meteor/alanning:roles";

import {privateRoutes} from "../security";

import "../../../../ui/views/layout";
import "../../../../ui/views/private/posts/list";
import "../../../../ui/views/private/posts/upsert";

privateRoutes.route("/posts", {
    name: "private.posts",
    action: function () {
        BlazeLayout.render("layout", {main: "private.posts.list"});
    }
});

privateRoutes.route("/posts/add", {
    name: "private.posts.add",
    action: function () {
        BlazeLayout.render("layout", {main: "private.posts.upsert"});
    }
});

privateRoutes.route("/posts/:postId/edit", {
    name: "private.posts.edit",
    action: function () {
        BlazeLayout.render("layout", {main: "private.posts.upsert"});
    }
});