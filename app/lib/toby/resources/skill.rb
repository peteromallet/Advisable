# frozen_string_literal: true

module Toby
  module Resources
    class Skill < BaseResource
      model_name ::Skill
      attribute :name, Attributes::String

      def self.label(record, context)
        Lazy::Label.new(::Skill, :id, :name, record.id, context)
      end
    end
  end
end
