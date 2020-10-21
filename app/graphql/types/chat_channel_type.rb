class Types::ChatChannelType < Types::BaseType
  field :sid, String, null: true
  field :friendly_name, String, null: true
  field :unique_name, String, null: true
  field :members_count, Int, null: true
  field :messages_count, Int, null: true
  field :date_created, GraphQL::Types::ISO8601DateTime, null: true
  field :date_updated, GraphQL::Types::ISO8601DateTime, null: true
end
