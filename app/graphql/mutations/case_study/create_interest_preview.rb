# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateInterestPreview < Mutations::BaseMutation
      graphql_name "CreateCaseStudyInterestPreview"

      argument :term, String, required: true

      field :interest_preview, Types::CaseStudy::InterestPreview, null: false

      def authorized?(**_args)
        requires_current_user!
      end

      def resolve(term:)
        interest_preview = ::CaseStudy::InterestPreview.find_or_create_by!(term:, account: current_user.account)
        interest_preview.find_results!
        track_event("Search", {term:})
        {interest_preview:}
      end
    end
  end
end
