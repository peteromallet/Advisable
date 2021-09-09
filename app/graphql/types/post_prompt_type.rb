# frozen_string_literal: true

module Types
  class PostPromptType < Types::BaseType
    description "Fields representing a Post Prompt model"
    graphql_name "PostPrompt"

    field :cta, String, null: true
    field :description, String, null: true
    field :id, ID, null: false
    field :label, Types::LabelType, null: false
    field :prompt, String, null: true

    field :posts, [Types::Guild::PostInterface], null: false

    def posts
      object.label.guild_posts.includes(specialist: :account).published.order(created_at: :desc).limit(5)
    end
  end
end
