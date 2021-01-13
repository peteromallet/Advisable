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

    raise ApiError::InvalidRequest.new("invalidProject", "The project does not belong to signed in user.")
  end

  def resolve(project_id:, email:, **optional)
    email_blacklisted?(email)
    attributes = optional.slice(:first_name, :last_name)
    account = Account.new(email: email, **attributes)
    account.save!
    new_user = current_user.invite_comember!(account)

    project = Project.find_by!(uid: project_id)
    UserMailer.invited_to_review_applications(current_user, new_user, project, application_id: optional[:application_id]).deliver_later

    {user: new_user}
  rescue ActiveRecord::RecordInvalid
    if account.errors.added?(:email, :taken, value: email)
      raise ApiError::InvalidRequest.new("emailTaken", "The email #{email} is already used by another account.")
    elsif account.errors.added?(:email, :blank)
      raise ApiError::InvalidRequest.new("emailBlank", "Email is required.")
    else
      raise
    end
  end
end
