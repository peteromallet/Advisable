# frozen_string_literal: true

module Toby
  module Resources
    class Skill < BaseResource
      model_name ::Skill
      attribute :name, Attributes::String

      def self.label(record)
        record.name
      end
    end
  end
end
