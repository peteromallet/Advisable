# Advisable

## Admin portal.
The admin portal can be accessed by going to `/admin`, where you will be asked
to enter the admin credentials. From here you will be able to view and
manipulate data in the local database. **It's important to note that any changes
made from here will NOT be synced to airtable**. These credentials are defined
by two environment variables `ADMIN_USERNAME` and `ADMIN_PASSWORD`.

## Database
The data for the application originates from an airtable database. **It is vital
that the airtable database column names are not changed as this will break the
mapping between the local database and airtable.**
The data can be synced to the local database using the command.

```
$ rails airtable:sync
```

This command should be setup to run regularly to keep the data up to date.

### Syncing an airtable database table.
Each table in airtable is synced by defining a class which inherits from [Airtable::Base](https://github.com/thomascullen/Advisable/tree/master/app/models/concerns/airtable/base.rb). These classes are defined in [app/models/concerns/airtable](https://github.com/thomascullen/Advisable/tree/master/app/models/concerns/airtable).

# Setup
You will need to install ruby, postgres and redis.

```
$ bundle
$ rails db:setup
```

# Development
The advisable application is built on ruby on rails. The frontend is built in
React which is delivered by the rails app using the [webpacker](https://github.com/rails/webpacker) gem. The source code for the frontend codebase can be found in [/app/javascript/src](app/javascript/src). The frontend codebase communicates with the backend via a GraphQL API which can be found in [/app/graphql](app/graphql).

See the [API documentation](docs/api.md) for more details on the graphql API.

You can run the app locally using the heroku toolbelt or the [foreman gem](https://github.com/ddollar/foreman). You will also need to run webpack in a separate process to compile the frontend assets.

```
$ heroku local
$ ./bin/webpacker-dev-server
```
or
```
$ foreman
$ ./bin/webpacker-dev-server
```

## Background Jobs
Background jobs are stored in a redis queue and processed by sidekiq. You can
run both of these processes by running the following commands in two separate
terminal windows.

```
$ redis-server
$ bundle exec sidekiq
```

## Frontend Structure
The frontend codebase follows a certain folder structure.

- `/components`: This is all global components are defined. Global components are components that are used in mulitple places throughout the application. A component can be defined as a single file, or as a folder with an `index.js` file inside that exports the entire component.
- `/views`: All of the various views in the application are defined here. A view folder can contain multiple sub folders:
  - `/components`: Any components that are specific to the parent view.
  - `/containers`: Components that are used to fetch and send data for the given view.

## Environment variables
Environment variables can be set in development by creating a `.env` file
in the root directory.

- `ADMIN_PASSWORD`: Sets the password for the admin dashboard
- `ADMIN_USERNAME`: Sets the username for the admin dashboard
- `AIRTABLE_API_KEY`: The API key for the Airtable database.
- `AIRTABLE_DATABASE_KEY`: The database key for the Airtable database.
