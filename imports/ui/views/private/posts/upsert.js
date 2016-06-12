import {Template} from "meteor/templating";
import {FlowRouter} from "meteor/kadira:flow-router";
import {AutoForm} from "meteor/aldeed:autoform";
import {ReactiveDict} from "meteor/reactive-dict";

import {Posts} from "../../../../api/posts/posts";

import {Notifier} from "../../../../startup/services/notifier.service";

import {schema as PostForm} from "../../../../startup/forms/private/post.form";
import "./upsert.html";

Template["private.posts.upsert"].onCreated(function () {
    this.subscribe("private.posts.one", FlowRouter.getParam("postId"));

    this.state = new ReactiveDict();

    this.autorun(() => {
        this.state.set("postId", FlowRouter.getParam("postId"));
        this.state.set("isEdition", !!this.state.get("postId"));
    });
});

Template["private.posts.upsert"].onDestroyed(function () {
    AutoForm.resetForm("private.posts.insert");
    AutoForm.resetForm("private.posts.update");
});

Template["private.posts.upsert"].helpers({
    isEdition() {
        return Template.instance().state.get("isEdition");
    },
    doc() {
        let state = Template.instance().state;
        return state.get("isEdition") ? Posts.findOne(state.get("postId")) : {};
    },
    form() {
        return PostForm;
    },
    subsReady() {
        return Template.instance().subscriptionsReady();
    }
});

AutoForm.addHooks("private.posts.insert", {
    onSuccess: function () {
        Notifier.success("New post added");
        FlowRouter.go("private.posts");
    }
});

AutoForm.addHooks("private.posts.update", {
    onSuccess: function () {
        Notifier.success("Post updated. Note that the creation date of the post could change to 02/02/02. See the Posts update method to see why.");
    }
});