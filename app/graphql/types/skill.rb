# frozen_string_literal: true

module Types
  class Skill < Types::BaseType
    field :id, ID, null: false
    field :name, String, null: false
    field :goal_placeholder, String, null: true
    field :characteristic_placeholder, String, null: true

    def id
      object.uid
    end
  end
end
