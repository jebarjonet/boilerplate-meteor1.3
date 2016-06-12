import {Template} from "meteor/templating";
import {AutoForm} from "meteor/aldeed:autoform";

import {Notifier} from "../../../../../startup/services/notifier.service";

import {schema as RegisterForm} from "../../../../../startup/forms/public/auth/register.form";
import "./register.html";

Template["public.auth.register"].helpers({
    formSchema() {
        return RegisterForm;
    }
});

AutoForm.addHooks("public.auth.register", {
    onSuccess: function () {
        Notifier.success("We have sent you a verification email. See you soon !");
    }
});