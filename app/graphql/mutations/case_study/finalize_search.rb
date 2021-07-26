# frozen_string_literal: true

module Mutations
  module CaseStudy
    class FinalizeSearch < Mutations::BaseMutation
      description "Finalizes a Case Study Search"
      graphql_name "FinalizeCaseStudySearch"

      argument :id, ID, required: true
      argument :preferences, [String], required: false

      field :search, Types::CaseStudy::Search, null: true

      def authorized?(id:, **_)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: id)
        policy = ::CaseStudy::SearchPolicy.new(current_user, search)
        return true if policy.finalize?

        ApiError.not_authorized("You do not have permission to finalize this search")
      end

      def resolve(id:, preferences:)
        search = ::CaseStudy::Search.find_by!(uid: id)
        search.update(finalized_at: Time.zone.now, preferences: preferences)

        {search: search}
      end
    end
  end
end
