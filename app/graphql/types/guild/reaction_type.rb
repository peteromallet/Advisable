class Types::Guild::ReactionType < Types::BaseType
  include ActionView::Helpers::DateHelper

  graphql_name 'GuildReaction'

  implements Types::Guild::AuthorInterface

  field :id, ID, null: false do
    description 'The unique ID for the reaction'
  end

  field :kind, String, null: true

  field :reactionable, Types::Guild::ReactionableUnion, null: false do
    description 'The relation the reaction was for.'
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    description 'The timestamp for when the guild reaction was created'
  end

  field :created_at_time_ago, String, null: true do
    description 'The timestamp in words for when the guild reaction was created'
  end
  def created_at_time_ago
    time_ago_in_words(object.created_at)
  end
end
