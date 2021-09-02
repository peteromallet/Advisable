# frozen_string_literal: true

module Toby
  module Resources
    module CaseStudy
      class Search < BaseResource
        model_name ::CaseStudy::Search

        attribute :uid, Attributes::String, readonly: true
        attribute :user, Attributes::BelongsTo
        attribute :name, Attributes::String
        attribute :business_type, Attributes::String
        attribute :company_recomendation, Attributes::Boolean
        attribute :finalized_at, Attributes::DateTime
        attribute :goals, Attributes::TextArray
        # attribute :preferences, Attributes::TextArray
        attribute :results, Attributes::TextArray # this has to be improved somehow

        attribute :search_feedbacks, Attributes::HasMany
      end
    end
  end
end
