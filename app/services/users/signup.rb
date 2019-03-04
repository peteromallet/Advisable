# Handles the signup proress for a user.
class Users::Signup < ApplicationService
  attr_reader :email, :password, :password_confirmation

  def initialize(email:, password:, password_confirmation:)
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    account.assign_attributes(
      password: password,
      password_confirmation: password_confirmation
    )

    if account.save
      account.send_confirmation_email
      account
    else
      raise Service::Error.new(account.errors.full_messages.first)
    end
  end

  private

  def account
    @account ||= User.find_or_initialize_by(email: email.downcase, password_digest: nil)
  end
end