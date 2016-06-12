import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {AutoForm} from "meteor/aldeed:autoform";
import {Accounts} from "meteor/accounts-base";

import {Notifier} from "../../../../../startup/services/notifier.service";

import {schema as ResetForm} from "../../../../../startup/forms/public/auth/reset.form";
import "./reset.html";

Template["public.auth.reset"].helpers({
    formSchema() {
        return ResetForm;
    }
});

AutoForm.addHooks("public.auth.reset", {
    onSubmit: function (doc) {
        this.event.preventDefault();
        Accounts.resetPassword(FlowRouter.getParam("token"), doc.password, this.done);
    },
    onSuccess: function () {
        Notifier.success("Your password has been successfully reset");
        FlowRouter.go("public.auth.login");
    }
});