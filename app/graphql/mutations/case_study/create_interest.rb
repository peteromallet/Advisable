# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateInterest < Mutations::BaseMutation
      graphql_name "CreateCaseStudyInterest"

      argument :term, String, required: true

      field :interest, Types::CaseStudy::Interest, null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(**args)
        interest = current_account_responsible_for do
          term = args[:term].presence || args[:name]
          interest = ::CaseStudy::Interest.create!(term:, account: current_user.account)
          interest.load_results!
          interest
        end

        {interest:}
      end
    end
  end
end
