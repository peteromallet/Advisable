# frozen_string_literal: true

module Types
  module Guild
    class Post < Types::BaseType
      include ActionView::Helpers::DateHelper
      implements Types::Guild::AuthorInterface

      description "Fields representing a Guild Post model"

      field :id, ID, null: false do
        description "The unique ID for the guild post"
      end

      field :title, String, null: true do
        description "The title of the guild post"
      end

      field :excerpt, String, null: true

      field :body, String, null: true do
        description "The body of the guild post"
      end

      field :status, String, null: true do
        description "The status of the guild post"
      end

      field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
        description "The timestamp for when the guild post record was created"
      end

      field :updated_at, GraphQL::Types::ISO8601DateTime, null: true do
        description "The timestamp for when the guild post record was last updated"
      end

      field :created_at_time_ago, String, null: true do
        description "The timestamp in words for when the guild post was created"
      end
      def created_at_time_ago
        time_ago_in_words(object.created_at)
      end

      field :engagements_count, Integer, null: true do
        description "The recorded number of engagements for this post"
      end

      field :engaged, Boolean, null: false do
        description "Whether or not the current user has engaged with this post"
      end

      def engaged
        object.engagements.exists?(specialist: current_user)
      end

      field :audience_type, String, null: true do
        description "The type of audience configured for this post"
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
    end
  end
end
