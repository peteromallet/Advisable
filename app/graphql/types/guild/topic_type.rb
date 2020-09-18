class Types::Guild::TopicType < Types::BaseType
  graphql_name 'GuildTopic'

  field :id, ID, null: false do
    description 'The unique ID for the Guild Topic'
  end

  field :name, String, null: false do
    description 'The name of the Guild Topic'
  end
end
