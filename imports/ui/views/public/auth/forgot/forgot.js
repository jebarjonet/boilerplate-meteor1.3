import {Template} from "meteor/templating";
import {AutoForm} from "meteor/aldeed:autoform";

import {Notifier} from "../../../../../startup/services/notifier.service";

import {schema as ForgotForm} from "../../../../../startup/forms/public/auth/forgot.form";
import "./forgot.html";

Template["public.auth.forgot"].helpers({
    formSchema() {
        return ForgotForm;
    }
});

AutoForm.addHooks("public.auth.forgot", {
    onSuccess: function () {
        Notifier.success("We have sent you a reset email. See you soon !");
    }
});