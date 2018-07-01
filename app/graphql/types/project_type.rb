class Types::ProjectType < Types::BaseType

  field :id, ID, null: false
  field :name, String, null: false
  field :currency, String, null: true
  field :applications, [Types::ApplicationType, null: true], null: true

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  def applications
    object.applications.order(score: :desc)
  end

  def application(**args)
    object.applications.find(args[:id])
  end
end
