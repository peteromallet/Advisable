# frozen_string_literal: true

module Toby
  module Resources
    module CaseStudy
      class SearchFeedback < BaseResource
        model_name ::CaseStudy::SearchFeedback

        attribute :article, Attributes::BelongsTo
        # TODO: attribute :search, Attributes::BelongsTo
        attribute :feedback, Attributes::LongText
        attribute :resolved_at, Attributes::DateTime

        action :resolve, label: "Mark as resolved"

        def self.resolve(object)
          object.update!(resolved_at: Time.zone.now)
        end
      end
    end
  end
end
