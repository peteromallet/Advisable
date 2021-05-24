# frozen_string_literal: true

module Mutations
  class InviteUserToReviewApplications < Mutations::BaseMutation
    include Mutations::Helpers::Account

    argument :application_id, ID, required: false
    argument :email, String, required: true
    argument :first_name, String, required: false
    argument :last_name, String, required: false
    argument :project_id, ID, required: true

    field :user, Types::User, null: true

    def authorized?(project_id:, **_args)
      requires_client!

      project = Project.find_by!(uid: project_id)
      return true if current_user == project.user

      ApiError.invalid_request("INVALID_PROJECT", "The project does not belong to signed in user.")
    end

    def resolve(project_id:, email:, **optional)
      invited_user = find_or_create_user_by_email!(email, optional)
      project = Project.find_by!(uid: project_id)
      UserMailer.invited_to_review_applications(current_user, invited_user, project, application_id: optional[:application_id]).deliver_later

      {user: invited_user}
    end
  end
end
