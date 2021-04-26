# frozen_string_literal: true

module Types
  module Guild
    module PostInterface
      include Types::BaseInterface
      include ActionView::Helpers::DateHelper

      field_class BaseField

      include Types::Guild::AuthorInterface
      include Types::Guild::ReactionInterface

      orphan_types Types::Guild::Post::PostType, Types::Guild::Post::AdviceRequiredType, Types::Guild::Post::CaseStudyType, Types::Guild::Post::OpportunityType

      description "Fields representing a Guild Post model"

      field :id, ID, null: false do
        description 'The unique ID for the guild post'
      end

      field :title, String, null: true do
        description 'The title of the guild post'
      end

      field :excerpt, String, null: true

      field :body, String, null: true do
        description 'The body of the guild post'
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

      field :denormalized_type, String, null: true
      def denormalized_type
        object.type
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

      field :engagements_count, Integer, null: true do
        description 'The recorded number of engagements for this post'
      end

      field :engaged, Boolean, null: false do
        description "Whether or not the current user has engaged with this post"
      end

      def engaged
        object.engagements.exists?(specialist: current_user)
      end

      field :audience_type, String, null: true do
        description 'The type of audience configured for this post'
      end

      field :labels, [Types::LabelType], null: true
      def labels
        if current_user == object.specialist
          object.labels
        else
          object.labels.published
        end
      end

      field :images, [Types::Guild::PostImageType], null: false
      def images
        object.images.order(position: :asc)
      end

      field :cover_image, Types::Guild::PostImageType, null: true

      field :shareable, Boolean, null: true

      field :pinned, Boolean, null: true

      field :resolved, Boolean, null: true
      def resolved
        !!object.resolved_at
      end

      field :is_popular, Boolean, null: true
      def is_popular
        object.popular?
      end

      field :post_prompt, Types::PostPromptType, null: true

      definition_methods do
        def resolve_type(object, _context)
          raise "Unexpected Post Type: #{object.inspect}" unless ::Guild::Post::POST_TYPES.include?(object.type)

          "Types::Guild::Post::#{object.type}Type".constantize
        end
      end
    end
  end
end
