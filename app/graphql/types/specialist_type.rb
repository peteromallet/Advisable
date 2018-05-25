Types::SpecialistType = GraphQL::ObjectType.define do
  name 'Specialist'

  field :id, !types.ID
  field :name, types.String, hash_key: :name
  field :city, types.String, hash_key: :city
  field :country, Types::CountryType, hash_key: :country
  field :travel, types.String, hash_key: :can_travel
  field :linkedin, types.String, hash_key: :linkedin_url
  field :image, Types::AttachmentType do
    resolve ->(obj, args, ctx) {
      obj[:image].try(:first)
    }
  end

  field :skills, types[types.String] do
    resolve ->(obj, args, ctx) {
      obj[:expertise].map { |s| s[:name] }
    }
  end
end
