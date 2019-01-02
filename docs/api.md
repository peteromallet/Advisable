The react frontend communicates with the backend via a GraphQL API. The graphql API is built using the [graphql-ruby](https://github.com/rmosolgo/graphql-ruby) gem. All of the classes can be found inside [/app/graphql](https://github.com/peteradvisable/Advisable/tree/master/app/graphql).

# Authentication
Although the API does not require the user to be authenticated to query data,
some resources will return null if it requires an authorized user to access it.
You can make an authenticated request by passing a JWT in the Authorization
header as a bearer token.

## Obtaining a JWT
You can obtain a usrs JWT by calling the `login` mutation in graphq.

```graphql
login(input: {
  email: "example@example.com",
  password: "testing123"
}) {
  token
  errors {
    code
  }
}
```

# Authorization Logic
Graphql requests are authorized using pundit policies. The logic for this can
be seen in the `BaseField` class.

The following will call the ProjectPolicy "is_user?" method to
determin wether or not the email can be accessed. If authorization fails
null willl be returned for the email.

```rb
class Types::Project < Types::BaseType
  field :email, String, null: true, authorize: :is_user
end
```

If a `authorize` is present on the field that does not have a parent
( e.g QueryType ) the result of the field resolve function will be used for the
pundit policy rather than the parent record.

```rb
class Types::QueryType < Types::BaseType
  # Becuase there is no parent object, ProjectPolicy will be used to authorize
  # the request
  field :project, Types::Project, null: true, authorize: :is_client do
    argument :id, ID, required: true
  end

  def project(id: id)
    Project.find(id)
  end
end
```