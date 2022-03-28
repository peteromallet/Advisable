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

      def resolve(term:)
        interest = ::CaseStudy::Interest.new(term:, account: current_user.account)
        save_with_current_account!(interest)
        {interest:}
      end
    end
  end
end
