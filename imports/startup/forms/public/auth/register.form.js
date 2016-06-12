import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const schema = new SimpleSchema({
    username: {
        type: String,
        min: 4,
        max: 30
    },
    email: {
        type: String,
        label: "Email address",
        autoform: {
            type: "email"
        },
        regEx: SimpleSchema.RegEx.Email
    },
    password: {
        type: String,
        autoform: {
            type: "password"
        }
    }
});