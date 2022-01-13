# frozen_string_literal: true

module Toby
  module Resources
    module CaseStudy
      class Skill < BaseResource
        model_name ::CaseStudy::Skill
        attribute :uid, Attributes::String, readonly: true
        attribute :primary, Attributes::Boolean
        attribute :article, Attributes::BelongsTo
        attribute :skill, Attributes::BelongsTo

        def self.label(record, context)
          Lazy::Label.new(::Skill, record.skill_id, context, value_column: :name)
        end
      end
    end
  end
end
