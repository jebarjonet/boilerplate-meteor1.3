import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const schema = new SimpleSchema({
    email: {
        type: String,
        label: "Username or email"
    },
    password: {
        type: String,
        autoform: {
            type: "password"
        }
    }
});