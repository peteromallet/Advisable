# Handles the signup proress for a user.
class Users::Signup < ApplicationService
  attr_reader :id, :email, :password, :password_confirmation

  def initialize(id:, email:, password:, password_confirmation:)
    @id = id
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    account_already_exists?
    account.assign_attributes(
      email: email,
      password: password,
      password_confirmation: password_confirmation
    )

    if account.save
      account.send_confirmation_email
      account.sync_to_airtable
      account
    else
      raise Service::Error.new(account.errors.full_messages.first)
    end
  end

  private

  def account
    @account ||= User.find_by_airtable_id!(id)
  end

  def account_already_exists?
    raise Service::Error.new("account_already_exists") if account.has_account?
  end
end