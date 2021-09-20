# frozen_string_literal: true

module Toby
  module Resources
    class SkillCategory < BaseResource
      model_name ::SkillCategory
      attribute :name, Attributes::String
      attribute :skills, Attributes::HasManyThrough

      def self.label(record, context)
        Lazy::Label.new(::SkillCategory, record.id, context, value_column: :name)
      end

      def self.search(query)
        ::SkillCategory.where("name ILIKE ?", "%#{query}%")
      end
    end
  end
end
