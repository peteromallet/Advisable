class Types::Guild::ReactionType < Types::BaseType
  graphql_name "GuildReaction"

  implements Types::Guild::AuthorInterface

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    description 'The timestamp for when the guild reaction was created'
  end

  field :kind, String, null: true
end
