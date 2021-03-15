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

    field :country, Types::CountryType, null: true
    field :skill, Types::Skill, null: true
    field :industry, Types::IndustryType, null: true
  end
end
