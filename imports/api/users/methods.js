import {Meteor} from "meteor/meteor";
import {ValidatedMethod} from "meteor/mdg:validated-method";
import {Accounts} from "meteor/accounts-base";

import "./users";

import {schema as RegisterForm} from "../../startup/forms/public/auth/register.form";
import {schema as ForgotForm} from "../../startup/forms/public/auth/forgot.form";

export const register = new ValidatedMethod({
    name: "user.auth.register",
    mixins: [ValidatedMethod.mixins.checkSchema],
    schema: RegisterForm,
    run(doc) {
        const userId = Accounts.createUser(doc);

        Accounts.sendVerificationEmail(userId);

        return userId;
    }
});

export const forgot = new ValidatedMethod({
    name: "user.auth.forgot",
    mixins: [ValidatedMethod.mixins.checkSchema],
    schema: ForgotForm,
    run(doc) {
        const user = Accounts.findUserByEmail(doc.email);

        if (!user) {
            throw new Meteor.Error(403, "This user does not exist");
        }

        Accounts.sendResetPasswordEmail(user._id);
    }
});