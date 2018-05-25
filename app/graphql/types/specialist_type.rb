Types::SpecialistType = GraphQL::ObjectType.define do
  name 'Specialist'

  field :id, !types.ID
  field :name, types.String do
    resolve ->(obj, args, ctx) {
      "#{obj.first_name} #{obj.last_name}"
    }
  end
  field :city, types.String
  field :country, Types::CountryType
  field :travel_availability, types.String
  field :linkedin, types.String
  field :image, Types::AttachmentType

  field :skills, types[types.String] do
    resolve ->(obj, args, ctx) {
      []
    }
  end
end
