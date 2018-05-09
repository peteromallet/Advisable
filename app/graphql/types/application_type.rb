Types::ApplicationType = GraphQL::ObjectType.define do
  name 'Application'

  field :id, !types.ID
  field :rate, types.String, hash_key: :hourly_rate_for_project
  field :available, types.String, hash_key: :available_to_start
  field :specialist, Types::SpecialistType, hash_key: :expert
end
