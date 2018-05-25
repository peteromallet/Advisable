# Advisable

# Development

The advisable application is built on ruby on rails. The frontend is built in
React which is delivered by the rails app using the [webpacker](https://github.com/rails/webpacker) gem. The source code for the frontend codebase can be found in [/app/javascript/src](https://github.com/thomascullen/Advisable/tree/master/app/javascript/src). The frontend codebase communicates with the backend via a GraphQL API which can be found in [/app/graphql](https://github.com/thomascullen/Advisable/tree/master/app/graphql).

You can run the app locally by running the following commands in two separate processes.

```
$ rails s
$ ./bin/webpack-dev-server
```

## Frontend Structure
The frontend codebase follows a certain folder structure.

- `/components`: This is all global components are defined. Global components are components that are used in mulitple places throughout the application. A component can be defined as a single file, or as a folder with an `index.js` file inside that exports the entire component.
- `/views`: All of the various views in the application are defined here. A view folder can contain multiple sub folders:
  - `/components`: Any components that are specific to the parent view.
  - `/containers`: Components that are used to fetch and send data for the given view.
