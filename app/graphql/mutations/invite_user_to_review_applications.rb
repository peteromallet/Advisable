# frozen_string_literal: true

class Mutations::InviteUserToReviewApplications < Mutations::BaseMutation
  include Mutations::Helpers::BlacklistedEmail

  argument :project_id, ID, required: true
  argument :application_id, ID, required: false
  argument :email, String, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false

  field :user, Types::User, null: true

  def authorized?(project_id:, **args)
    requires_client!

    project = Project.find_by!(uid: project_id)
    return true if current_user == project.user

    ApiError.invalid_request("invalidProject", "The project does not belong to signed in user.")
  end

  def resolve(project_id:, email:, **optional)
    existing_acc = Account.find_by(email: email)
    if existing_acc
      invited_user = existing_acc.user
    else
      email_blacklisted?(email)
      attributes = optional.slice(:first_name, :last_name)
      account = Account.new(email: email, **attributes)
      account.save!
      invited_user = current_user.invite_comember!(account)
    end

    project = Project.find_by!(uid: project_id)
    UserMailer.invited_to_review_applications(current_user, invited_user, project, application_id: optional[:application_id]).deliver_later

    {user: invited_user}
  rescue ActiveRecord::RecordInvalid
    if account.errors.added?(:email, :blank)
      ApiError.invalid_request("emailBlank", "Email is required.")
    else
      raise
    end
  end
end
