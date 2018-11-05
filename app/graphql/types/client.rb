class Types::Client < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :projects, [Types::ProjectType], null: true
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false

  # As we dont have client login's yet we still need to query availability on
  # the client level. We can forward this to the primary_user. For now it works
  # well that we are not excluding times from scheduled interviews like we do
  # on the user type, however, eventually we will prop want to move this
  # functionality into an argument. e.g user { availability(excludeScheduledInterviews: true) }
  def availability
    object.primary_user.availability || []
  end
end
