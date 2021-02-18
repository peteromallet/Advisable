# frozen_string_literal: true

module Toby
  module Resources
    class Specialist < BaseResource
      model_name ::Specialist
      # query_names collection: :accounts
      attribute :uid, Attributes::String
      attribute :email, Attributes::String
      attribute :bio, Attributes::String
      attribute :country, Attributes::BelongsTo
    end
  end
end
