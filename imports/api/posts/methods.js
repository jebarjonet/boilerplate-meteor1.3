import {ValidatedMethod} from "meteor/mdg:validated-method";
import {PrivateMethod} from "../../startup/utils/private-method";

import {Posts} from "./posts";

import {schema as PostForm} from "../../startup/forms/private/post.form.js";

export const insert = new ValidatedMethod({
    name: "posts.insert",
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.checkSchema],
    schema: PostForm,
    run(doc) {
        doc.authorId = Meteor.userId();

        return Posts.insert(doc);
    }
});

export const update = new ValidatedMethod({
    name: "posts.update",
    mixins: [ValidatedMethod.mixins.isLoggedIn, ValidatedMethod.mixins.checkSchemaModifier],
    schema: PostForm,
    run({_id, modifier}) {
        // silly example to show private method usage
        if (Math.random() >= 0.5) {
            changeCreatedAt.call({
                postId: _id,
                newCreatedAt: new Date("02-02-2002")
            });
        }

        return Posts.update(_id, modifier);
    }
});

export const changeCreatedAt = new PrivateMethod({
    schema: {
        postId: {
            type: String
        },
        newCreatedAt: {
            type: Date
        }
    },
    run({postId, newCreatedAt}) {
        Posts.update(postId, {
            $set: {
                createdAt: newCreatedAt
            }
        });
    }
});