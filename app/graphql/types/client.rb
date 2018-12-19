class Types::Client < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :projects, [Types::ProjectType], null: true
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false

  def availability
    []
  end
end
