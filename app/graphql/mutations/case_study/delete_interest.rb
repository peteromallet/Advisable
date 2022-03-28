# frozen_string_literal: true

module Mutations
  module CaseStudy
    class DeleteInterest < Mutations::BaseMutation
      description "Delete a Case Study Interest"
      graphql_name "DeleteCaseStudyInterest"

      argument :id, ID, required: true

      field :success, Boolean, null: true

      def authorized?(id:)
        requires_client!

        interest = ::CaseStudy::Interest.find_by!(uid: id)
        policy = ::CaseStudy::InterestPolicy.new(current_user, interest)
        return true if policy.delete?

        ApiError.not_authorized("You do not have permission to delete this interest")
      end

      def resolve(id:)
        interest = ::CaseStudy::Interest.find_by!(uid: id)
        interest.destroy!

        {success: true}
      end
    end
  end
end
