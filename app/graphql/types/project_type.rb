class Types::ProjectType < Types::BaseType

  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :currency, String, null: true

  field :applications, [Types::ApplicationType, null: true], null: true do
    argument :status, [String], required: false
  end

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  def applications(**args)
    applications = object.applications.order(score: :desc)
    applications = applications.where(status: args[:status]) if args[:status]
    applications
  end

  def application(**args)
    by_airtable = object.applications.find_by_airtable_id(args[:id])
    return by_airtable if by_airtable
    object.applications.find(args[:id])
  end
end
