# frozen_string_literal: true

module Toby
  module Resources
    class PreviousProject < BaseResource
      model_name ::PreviousProject
      attribute :uid, Attributes::String, readonly: true
    end
  end
end
