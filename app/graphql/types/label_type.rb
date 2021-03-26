# frozen_string_literal: true

module Types
  class LabelType < Types::BaseType
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

    field :prompt, String, null: true
    field :prompt_cta, String, null: true
    field :description, String, null: true
    field :featured, Boolean, null: false
  end
end
