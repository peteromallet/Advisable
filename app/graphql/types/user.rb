class Types::User < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :first_name, String, null: false
  field :last_name, String, null: false
  field :client, Types::Client, null: false
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false

  # Override the getter for availability to exclude any times from upcoming
  # interviews
  def availability
    interviews = object.interviews.scheduled.map(&:starts_at)
    times = object.availability || []
    times.reject { |t| interviews.include?(t) }
  end
end
