module Types::Guild::PostInterface
  include Types::BaseInterface
  include ActionView::Helpers::DateHelper

  field_class BaseField

  include Types::Guild::AuthorInterface
  include Types::Guild::ReactionInterface

  orphan_types Types::Guild::Post::PostType,
               Types::Guild::Post::AdviceRequiredType,
               Types::Guild::Post::CaseStudyType,
               Types::Guild::Post::OpportunityType

  field :id, ID, null: false do
    description 'The unique ID for the guild post'
  end

  field :title, String, null: true do
    description 'The title of the guild post'
  end

  field :body, String, null: true do
    description 'The body of the guild post'
  end

  field :body_raw, String, null: true do
    description 'The serialized draftjs body of the guild post'
  end

  field :status, String, null: true do
    description 'The status of the guild post'
  end

  field :comments_count, Integer, null: false do
    description 'The total count of comments for a guild post'
  end

  field :type, String, null: false do
    description 'The guild post type'
  end
  def type
    object.normalized_type
  end

  field :commented, Boolean, null: false do
    description 'Whether the current user has commented on the guild post'
  end
  def commented
    object.comments.exists?(specialist: context[:current_user])
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    description 'The timestamp for when the guild post record was created'
  end

  field :updated_at, GraphQL::Types::ISO8601DateTime, null: true do
    # authorize :is_admin
    description 'The timestamp for when the guild post record was last updated'
  end

  field :created_at_time_ago, String, null: true do
    description 'The timestamp in words for when the guild post was created'
  end
  def created_at_time_ago
    time_ago_in_words(object.created_at)
  end

  field :comments, [Types::Guild::CommentType], null: false
  def comments
    object.parent_comments
    # TODO: include child comments
  end

  field :guild_topics, [Types::Guild::TopicType], null: true

  field :cover_image, String, null: true do
    description 'The cover image for the guild post'
  end
  def cover_image
    if object.cover_image.attached?
      return(
        Rails.application.routes.url_helpers.rails_blob_url(
          object.cover_image,
          host:
            ENV['ORIGIN'] || "https://#{ENV['HEROKU_APP_NAME']}.herokuapp.com"
        )
      )
    end
  end

  definition_methods do
    def resolve_type(object, context)
      if Guild::Post::POST_TYPES.include?(object.type)
        "Types::Guild::Post::#{object.type}Type".constantize
      else
        raise "Unexpected Post Type: #{object.inspect}"
      end
    end
  end
end
