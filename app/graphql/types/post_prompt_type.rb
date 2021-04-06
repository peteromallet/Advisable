# frozen_string_literal: true

module Types
  class PostPromptType < Types::BaseType
    description "Fields representing a Post Prompt model"
    graphql_name "PostPrompt"

    field :description, String, null: true
    field :featured, Boolean, null: false
    field :id, ID, null: false
    field :label, Types::LabelType, null: false
    field :prompt, String, null: true
    field :prompt_cta, String, null: true
  end
end
