# frozen_string_literal: true

module Mutations
  class DeleteJob < Mutations::BaseMutation
    argument :id, ID, required: true
    field :id, ID, null: true

    def authorized?(id:)
      requires_current_user!
      project = Project.find_by_uid_or_airtable_id!(id)
      policy = ProjectPolicy.new(current_user, project)

      ApiError.not_authorized("You do not have access to this project") unless policy.delete?

      ApiError.invalid_request("MUST_BE_DRAFT", "Project must be a draft") unless ["Draft", "Pending Advisable Confirmation"].include?(project.status)

      true
    end

    def resolve(id:)
      project = Project.find_by_uid_or_airtable_id!(id)
      project.destroy

      {id:}
    end
  end
end
