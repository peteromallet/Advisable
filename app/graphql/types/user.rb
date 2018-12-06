class Types::User < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: true
  field :email, String, null: false
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :client, Types::Client, null: true
  field :country, Types::CountryType, null: true
  field :confirmed, Boolean, null: false
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false do
    argument :exclude_conflicts, Boolean, required: false, description: 'Exclude any times that conflict with scheduled interviews'
  end

  def availability(exclude_conflicts: false)
    times = object.availability || []
    if exclude_conflicts
      interviews = object.interviews.scheduled.map(&:starts_at)
      times.reject! { |t| interviews.include?(t) }
    end
    times
  end
end
