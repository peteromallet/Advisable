# frozen_string_literal: true

module Types
  class LabelType < Types::BaseType
    description "Fields representing a Label model"
    graphql_name "Label"

    field :id, ID, null: false do
      description "The unique ID of the Label"
    end

    field :name, String, null: false do
      description "The name of the Label"
    end

    field :slug, String, null: false do
      description "The unique slug of the Label"
    end

    field :kind, String, null: true

    def kind
      return "SKILL" if object.skill_id.present?
      return "INDUSTRY" if object.industry_id.present?
      return "LOCATION" if object.country_id.present?

      "OTHER"
    end

    field :guild_posts, Types::Guild::PostInterface.connection_type, null: true, max_page_size: 5

    def guild_posts
      object.guild_posts.published.order(created_at: :desc)
    end
  end
end
