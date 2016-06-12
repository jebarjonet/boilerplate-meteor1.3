import {Meteor} from "meteor/meteor";
import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {AutoForm} from "meteor/aldeed:autoform";

import {Notifier} from "../../../../../startup/services/notifier.service";

import {schema as LoginForm} from "../../../../../startup/forms/public/auth/login.form";
import "./login.html";

Template["public.auth.login"].helpers({
    formSchema() {
        return LoginForm;
    }
});

AutoForm.addHooks("public.auth.login", {
    onSubmit: function (doc) {
        this.event.preventDefault();
        Meteor.loginWithPassword(doc.email, doc.password, this.done);
    },
    onSuccess: function () {
        Notifier.success("Successfully connected");
        FlowRouter.go("private");
    }
});