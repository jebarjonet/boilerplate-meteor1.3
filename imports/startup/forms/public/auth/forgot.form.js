import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const schema = new SimpleSchema({
    email: {
        type: String,
        label: "Email address of your account",
        regEx: SimpleSchema.RegEx.Email
    }
});