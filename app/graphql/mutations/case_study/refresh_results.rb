# frozen_string_literal: true

module Mutations
  module CaseStudy
    class RefreshResults < Mutations::BaseMutation
      description "Tops up the results for a case study search"
      graphql_name "RefreshCaseStudySearch"

      argument :id, ID, required: true

      field :search, Types::CaseStudy::Search, null: true

      def authorized?(id:)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: id)
        policy = ::CaseStudy::SearchPolicy.new(current_user, search)
        return true if policy.refresh?

        ApiError.not_authorized("You do not have permission to delete this search")
      end

      def resolve(id:)
        search = ::CaseStudy::Search.find_by!(uid: id)
        search.refresh_results!

        {search: search}
      end
    end
  end
end
