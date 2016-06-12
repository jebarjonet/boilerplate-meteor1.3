import {SimpleSchema} from "meteor/aldeed:simple-schema";

export const schema = new SimpleSchema({
    title: {
        type: String
    },
    text: {
        type: String,
        autoform: {
            rows: 8
        }
    }
});