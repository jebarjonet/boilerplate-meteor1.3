import {Template} from "meteor/templating";

import {Posts} from "../../../../api/posts/posts";

import "./list.html";

Template["private.posts.list"].onCreated(function () {
    this.subscribe("posts.all");
});

Template["private.posts.list"].helpers({
    posts() {
        return Posts.find({}, {
            sort: {
                createdAt: -1
            }
        });
    }
});