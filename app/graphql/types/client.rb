class Types::Client < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :projects, [Types::ProjectType], null: true
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false
  field :interviews, [Types::Interview], null: false do
    argument :status, String, required: false
  end

  def interviews(status: "Call Scheduled")
    interviews = object.interviews.where(status: status)
    interviews
  end
end
