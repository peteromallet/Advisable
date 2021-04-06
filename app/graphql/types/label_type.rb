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

    field :description, String, null: true
    field :featured, Boolean, null: false
    field :prompt, String, null: true
    field :prompt_cta, String, null: true

    field :guild_posts, Types::Guild::PostInterface.connection_type, null: true, max_page_size: 5

    def guild_posts
      object.guild_posts.published
    end
  end
end
