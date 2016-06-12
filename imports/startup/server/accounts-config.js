import {Meteor} from "meteor/meteor";
import {Accounts} from "meteor/accounts-base";
import {moment} from "meteor/momentjs:moment";
import {_} from "lodash";

// verify email config
Accounts.urls.verifyEmail = function (token) {
    return Meteor.absoluteUrl("auth/verify-email/" + token);
};

// reset password config
Accounts.urls.resetPassword = function (token) {
    return Meteor.absoluteUrl("auth/reset-password/" + token);
};

// update last connection date on login
Accounts.validateLoginAttempt(function (req) {
    // if no user registered
    if (!req.user) {
        return false;
    }

    if (req.user.emails && !req.user.emails[0].verified) {
        throw new Meteor.Error(403, "This account is not validated. You should have received an email on your registration");
    }

    // if user has been disabled
    if (req.user.disabled) {
        throw new Meteor.Error(403, "Your account has been disabled");
    }

    // update last connection date and remove old tokens
    Meteor.users.update(req.user._id, {
        $set: {
            lastConnectionAt: new Date()
        }
    });

    return true;
});

// prevent tokens over-accumulation
Accounts.onLogin(function (req) {
    var tokens = _.get(req, "user services resume loginTokens".split(" "), []);
    if (tokens.length > 6) {
        Meteor.users.update(req.user._id, {
            $pop: {
                "services.resume.loginToken": -1
            }
        });
    }
});