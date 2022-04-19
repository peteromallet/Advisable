# frozen_string_literal: true

module Toby
  module Resources
    module CaseStudy
      class Interest < BaseResource
        model_name ::CaseStudy::Interest

        attribute :uid, Attributes::String, readonly: true
        attribute :account, Attributes::BelongsTo
        attribute :term, Attributes::String

        def self.label(record, _context)
          record.term
        end

        def self.search(query)
          ::CaseStudy::Interest.where("term ILIKE ?", "%#{query}%")
        end
      end
    end
  end
end
