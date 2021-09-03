# frozen_string_literal: true

module Toby
  module Resources
    class Skill < BaseResource
      model_name ::Skill
      attribute :name, Attributes::String

      def self.label(record, context)
        Lazy::Label.new(::Skill, record.id, context, value_column: :name)
      end

      def self.search(query)
        ::Skill.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
