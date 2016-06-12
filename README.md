# Meteor 1.3 boilerplate

A boilerplate to start a Meteor 1.3 project with some basics, useful snippets and some good practices.

## Technologies
- [Meteor 1.3.2.4](https://meteor.com/) using **Blaze** as template renderer
- See [used packages](.meteor/packages)

## Features
- A **full collection example** : The *Posts* collection (logic, publications, ui and good practices)
- **User accounts** : Complete user management with *user-accounts*, custom templates, schema and methods. See the [auth folder](imports/ui/views/public/auth) for more info.
- **Private method** ([see logic](imports/startup/utils/private-method.js)) : A class to use private methods a similar way you use *validated method*, including schema validation and `run` method, but can not be called by client through DDP (the server has to expose it to client or it stays server only) ([see an example](imports/api/posts/methods) in methods *update* and *changeCreatedAt*). It allows to put the whole collection logic (client and/or server) in methods with similar syntax.
- **Validated method mixins** : Checking if user is logged in, if user is an admin, if the request comes from server, and checking schemas (classic and modifiers) ([see logic](imports/startup/utils/validated-method-mixins.js) and [examples here](imports/api/posts/methods))
- A **notifier** ([see](imports/startup/services/notifier.service.js)) : Display notifications on client when asked. Calculates the display time based on text length 
- **No testing** : Because. That's why.

## App structure
```
├───client
│
├───imports
│   ├───api
│   │   ├───posts
│   │   │   └───server
│   │   └───users
│   │       └───server
│   │
│   ├───startup
│   │   ├───client
│   │   │   └───routes
│   │   │       └───private
│   │   │
│   │   ├───forms
│   │   │   ├───private
│   │   │   └───public
│   │   │       └───auth
│   │   ├───server
│   │   ├───services
│   │   └───utils
│   │
│   └───ui
│       ├───stylesheets
│       │
│       └───views
│           ├───private
│           │   └───posts
│           └───public
│               └───auth
│
└───server
```

In **imports** :

- **api** : collections logic, methods and publications
- **startup** : 
    - **client** : startup content relative to client such as config, routes, helpers, etc.
    - **forms** : forms used in the app. The will be used on client to display them and on server as security middlewares to filter data coming from client
    - **server** : startup content relative to server such as config, fixtures, etc.
    - **services** : services for global usage such as a notifier for client
    - **utils** : libraries used in client or server. Could be in a `packages` folder 
- **ui** : stylesheets and views organized by features, close to the real sitemap