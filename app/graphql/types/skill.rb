# frozen_string_literal: true

module Types
  class Skill < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :name, String, null: false
    field :color, String, null: true
    field :goal_placeholder, String, null: true
    field :characteristic_placeholder, String, null: true
  end
end
