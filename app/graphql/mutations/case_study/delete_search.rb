# frozen_string_literal: true

module Mutations
  module CaseStudy
    class DeleteSearch < Mutations::BaseMutation
      description "Delete a Case Study Search"
      graphql_name "DeleteCaseStudySearch"

      argument :id, ID, required: true

      field :success, Boolean, null: true

      def authorized?(id:)
        requires_client!

        search = ::CaseStudy::Search.find_by!(uid: id)
        policy = ::CaseStudy::SearchPolicy.new(context[:current_user], search)
        return true if policy.delete?

        ApiError.not_authorized("You do not have permission to delete this search")
      end

      def resolve(id:)
        search = ::CaseStudy::Search.find_by!(uid: id)
        search.destroy!

        {success: true}
      end
    end
  end
end
