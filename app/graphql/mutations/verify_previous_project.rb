# frozen_string_literal: true

module Mutations
  class VerifyPreviousProject < Mutations::BaseMutation
    description "Verify previous project"

    argument :id, ID, required: true

    field :previous_project, Types::PreviousProject, null: true

    def authorized?(id:)
      requires_oauth_viewer!

      project = PreviousProject.find_by_uid!(id)
      verifier = PreviousProject::Verifier.new(oauth_viewer, project, responsible_id: current_account_id)
      verifier.can_verify?
    end

    def resolve(id:)
      project = PreviousProject.find_by_uid!(id)
      verifier = PreviousProject::Verifier.new(oauth_viewer, project, responsible_id: current_account_id)
      verifier.verify

      {previous_project: project}
    end
  end
end
