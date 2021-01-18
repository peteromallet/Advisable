# frozen_string_literal: true

class Mutations::CreateUserForCompany < Mutations::BaseMutation
  include Mutations::Helpers::BlacklistedEmail

  argument :email, String, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :team_manager, Boolean, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(email:, **optional)
    email_blacklisted?(email)
    attributes = optional.slice(:first_name, :last_name)
    attributes[:permissions] = optional[:team_manager] ? [:team_manager] : []
    account = Account.new(email: email, **attributes)
    account.save!

    new_user = current_user.invite_comember!(account)
    UserMailer.invited_by_manager(current_user, new_user).deliver_later

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
