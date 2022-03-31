# frozen_string_literal: true

module Mutations
  module CaseStudy
    class CreateInterests < Mutations::BaseMutation
      graphql_name "CreateCaseStudyInterests"

      argument :terms, [String], required: true

      field :interests, [Types::CaseStudy::Interest], null: false

      def authorized?(**_args)
        requires_client!
      end

      def resolve(terms:)
        interests = terms.uniq(&:downcase).map do |term|
          current_account_responsible_for do
            ::CaseStudy::Interest.create!(term:, account: current_user.account)
          end
        end
        {interests:}
      end
    end
  end
end
