# frozen_string_literal: true

module Mutations::Helpers::Account
  include Mutations::Helpers::BlacklistedEmail

  def find_or_create_account_by_email!(email, attributes = {})
    existing_acc = Account.find_by(email: email)
    if existing_acc
      existing_acc.user
    else
      email_blacklisted?(email)
      attributes = attributes.slice(:first_name, :last_name)
      account = Account.new(email: email, **attributes)
      account.save!
      current_user.invite_comember!(account)
    end
  rescue ActiveRecord::RecordInvalid
    if account.errors.added?(:email, :blank)
      raise ApiError::InvalidRequest.new("emailBlank", "Email is required.")
    else
      raise
    end
  end
end
