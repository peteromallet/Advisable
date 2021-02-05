# frozen_string_literal: true

module Types
  class Skill < Types::BaseType
    field :id, ID, null: false, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs."
    field :uid, ID
    field :name, String, null: false
    field :goal_placeholder, String, null: true
    field :characteristic_placeholder, String, null: true

    # TODO: Can we just return uid here, Thomas?
    def id
      object.airtable_id
    end
  end
end
