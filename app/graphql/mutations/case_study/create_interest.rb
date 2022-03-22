# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateInterest < Mutations::BaseMutation
      graphql_name "CreateCaseStudyInterest"

      # TODO: Remove these because they are only here for the purpose of duck typing with CaseStudy::Search. 👇
      argument :articles, [ID], required: false
      argument :business_type, String, required: false
      argument :categories, [ID], required: false
      argument :goals, [String], required: false
      argument :name, String, required: false
      argument :preferences, [String], required: false
      # TODO: Remove these because they are only here for the purpose of duck typing with CaseStudy::Search. 👆

      # TODO: Make it required once duck typing is removed
      argument :term, String, required: false

      # TODO: Search is here for duck typing. Remove when possible
      field :search, Types::CaseStudy::Interest, null: false
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

        {search: interest, interest:}
      end
    end
  end
end
