# frozen_string_literal: true

module Toby
  module Resources
    class Review < BaseResource
      model_name ::Review
      attribute :uid, Attributes::String
      attribute :comment, Attributes::String
    end
  end
end
