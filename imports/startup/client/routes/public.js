import {Accounts} from "meteor/accounts-base";
import {FlowRouter} from "meteor/kadira:flow-router";
import {BlazeLayout} from "meteor/kadira:blaze-layout";

import {Notifier} from "../../../startup/services/notifier.service";

import "../../../ui/views/not-found";
import "../../../ui/views/layout";
import "../../../ui/views/public/auth/forgot/forgot";
import "../../../ui/views/public/auth/login/login";
import "../../../ui/views/public/auth/register/register";
import "../../../ui/views/public/auth/reset/reset";

FlowRouter.notFound = {
    action: function () {
        BlazeLayout.render("layout", {main: "public.notFound"});
    }
};

FlowRouter.route("/", {
    name: "public",
    action() {
        BlazeLayout.render("layout");
    }
});

FlowRouter.route("/auth/register", {
    name: "public.auth.register",
    action() {
        BlazeLayout.render("layout", {main: "public.auth.register"});
    }
});

FlowRouter.route("/auth/login", {
    name: "public.auth.login",
    action() {
        BlazeLayout.render("layout", {main: "public.auth.login"});
    }
});

FlowRouter.route("/auth/forgot-password", {
    name: "public.auth.forgot",
    action() {
        BlazeLayout.render("layout", {main: "public.auth.forgot"});
    }
});

FlowRouter.route("/auth/reset-password/:token", {
    name: "public.auth.reset",
    action() {
        BlazeLayout.render("layout", {main: "public.auth.reset"});
    }
});

FlowRouter.route("/auth/verify-email/:token", {
    name: "public.auth.verify",
    action(params) {
        Accounts.verifyEmail(params.token, function (err) {
            if (err) {
                FlowRouter.go("public.auth.forgot");
                Notifier.error(err);
                return;
            }

            Notifier.success("Your account is now activated");
            FlowRouter.go("private");
        });
    }
});