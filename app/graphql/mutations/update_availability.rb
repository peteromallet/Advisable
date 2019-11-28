class Mutations::UpdateAvailability < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability, [String], required: true, description: "The clients availability. Should be an array of ISO strings"

  field :user, Types::User, null: true

  def resolve(**args)
    user = ::User.find_by_uid_or_airtable_id!(args[:id])
    user.update(availability: args[:availability])

    return { user: user }
  end
end
