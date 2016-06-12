import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const schema = new SimpleSchema({
    password: {
        type: String,
        label: "New password",
        min: 4,
        max: 50,
        autoform: {
            type: "password"
        }
    },
    confirmPassword: {
        type: String,
        label: "New password repeated",
        autoform: {
            type: "password"
        },
        custom: function() {
            if (this.value !== this.field("password").value) {
                return "passwordMismatch";
            }
        }
    }
});