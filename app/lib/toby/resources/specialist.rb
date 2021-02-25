# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      # query_names collection: :accounts
      attribute :uid, Attributes::String
      attribute :email, Attributes::String
      attribute :bio, Attributes::String
      attribute :account, Attributes::BelongsTo
      attribute :country, Attributes::BelongsTo
      attribute :applications, Attributes::HasMany
      attribute :skills, Attributes::HasMany, through: :specialist_skills
      attribute :reviews, Attributes::HasMany
    end
  end
end
