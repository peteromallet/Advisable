class Mutations::UpdateAvailability < Mutations::BaseMutation
  argument :id, ID, required: true
  argument :availability, [String], required: true, description: "The clients availability. Should be an array of ISO strings"

  field :client, Types::Client, null: true

  def resolve(**args)
    client = ::Client.find_by_airtable_id(args[:id])
    client.update_attributes(availability: args[:availability])

    return { client: client }
  end
end
