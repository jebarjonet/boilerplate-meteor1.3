import {AutoForm} from "meteor/aldeed:autoform";
import {sAlert} from "meteor/juliancwirko:s-alert";
import {NProgress} from "meteor/mrt:nprogress";
import {FlowRouterSEO} from "meteor/tomwasd:flow-router-seo";
import {SimpleSchema} from "meteor/aldeed:simple-schema";

import {Notifier} from "../services/notifier.service";

// FlowRouter SEO
let SEO = new FlowRouterSEO();
SEO.setDefaults({
    title: "Meteor 1.3 boilerplate",
    meta: {
        'name="viewport"': "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no",
        'property="og:type"': "website",
        'property="og:title"': "Meteor 1.3 boilerplate"
    }
});

// SimpleSchema custom errors
SimpleSchema.messages({
    passwordMismatch: "The passwords do not match"
});

// Alerts (notifications)
sAlert.config({
    effect: "slide",
    onRouteClose: false
});

// Autoform hooks
AutoForm.addHooks(null, {
    onError: function (m, err) {
        Notifier.error(err);
    }
});

// NProgress
NProgress.configure({showSpinner: false});