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
        existing_interests = current_user.account.interests.pluck(:term).map(&:downcase)
        new_terms = terms.uniq(&:downcase).reject { |t| existing_interests.include?(t.downcase) }
        ::Analytics.track(current_user, "Added Interests", {interests: new_terms})
        interests = new_terms.map do |term|
          current_account_responsible_for do
            ::CaseStudy::Interest.create!(term:, account: current_user.account)
          end
        end
        {interests:}
      end
    end
  end
end
