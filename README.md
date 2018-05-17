# Advisable


# Development

The advisable application is built on ruby on rails. The frontend is built in
React which is delivered by the rails app using the [webpacker](https://github.com/rails/webpacker) gem. The source code for the frontend codebase can be found in [/app/javascript/src](https://github.com/thomascullen/Advisable/tree/master/app/javascript/src). The frontend codebase communicates with the backend via a GraphQL API which can be found in [/app/graphql](https://github.com/thomascullen/Advisable/tree/master/app/graphql).

You can run the entire app locally by simply running

```
$ rails s
```

If you are working on the frontend, you will want to run webpack in a separate process to enable live reloading. You can do this by running the following command in another terminal window along side the rails app.

```
$ ./bin/webpack-dev-server
```
