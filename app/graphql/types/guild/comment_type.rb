class Types::Guild::CommentType < Types::BaseType
  include ActionView::Helpers::DateHelper

  graphql_name 'GuildComment'

  implements Types::Guild::AuthorInterface
  implements Types::Guild::ReactionInterface

  field :id, ID, null: false do
    description 'The unique ID for the guild comment'
  end

  field :body, String, null: true do
    description 'The body of the guild comment'
  end

  field :post, Types::Guild::PostInterface, null: true
  description 'The post of the guild comment'
  def post
    object.parent_comment_id ? object.parent_comment.post : object.post
  end

  field :commented, Boolean, null: false do
    description 'Whether the current user has commented on the guild comment'
  end
  def commented
    object.child_comments.exists?(specialist_id: context[:current_user])
  end

  field :parent_comment, Types::Guild::CommentType, null: true do
    description 'The parent comment'
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    description 'The timestamp for when the comment was created'
  end

  field :created_at_time_ago, String, null: true do
    description 'The timestamp in words for when the comment was created'
  end
  def created_at_time_ago
    time_ago_in_words(object.created_at)
  end
end
