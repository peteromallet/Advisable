# frozen_string_literal: true

module Types
  class IndustryType < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :name, String, null: false
    field :color, String, null: false

    field :popular_skills, Types::Skill.connection_type, null: false
    def popular_skills
      object.skills.popular
    end
  end
end
