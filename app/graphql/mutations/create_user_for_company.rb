# frozen_string_literal: true

class Mutations::CreateUserForCompany < Mutations::BaseMutation
  argument :email, String, required: true
  argument :first_name, String, required: false
  argument :last_name, String, required: false
  argument :team_manager, Boolean, required: false

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(email:, **optional)
    unless BlacklistedDomain.email_allowed?(email)
      raise ApiError::InvalidRequest.new("nonCorporateEmail", "The email #{email} is not allowed")
    end

    attributes = optional.slice(:first_name, :last_name)
    attributes[:permissions] = optional[:team_manager] ? [:team_manager] : []
    account = Account.new(email: email, **attributes)
    account.save!

    {user: current_user.invite_comember!(account)}
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
