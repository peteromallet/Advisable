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
      if object.skill_id?
        "Skill"
      elsif object.industry_id?
        "Industry"
      elsif object.country_id?
        "Location"
      else
        "Other"
      end
    end

    field :guild_posts, Types::Guild::PostInterface.connection_type, null: true, max_page_size: 5

    def guild_posts
      object.guild_posts.published.order(created_at: :desc)
    end
  end
end
