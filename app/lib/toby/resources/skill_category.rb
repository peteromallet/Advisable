# frozen_string_literal: true

module Toby
  module Resources
    class SkillCategory < BaseResource
      model_name ::SkillCategory
      attribute :name, Attributes::String
      attribute :description, Attributes::String

      def self.label(record, _context)
        record.name
      end

      def self.search(query)
        ::SkillCategory.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
