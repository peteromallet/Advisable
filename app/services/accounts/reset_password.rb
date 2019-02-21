# Handles the password reset for an account.
# @param account An isntance of the account.
# @param token The password reset token. This must correspond with the
# reset_digest.
# @password [String] password The new password
# @password [String] password_confirmation The new password
class Accounts::ResetPassword < ApplicationService
  attr_reader :account, :token, :password, :password_confirmation

  def initialize(account:, token:, password:, password_confirmation:)
    @account = account
    @token = token
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    validate_token
    check_reset_expired
    account.update_attributes(
      password: password,
      password_confirmation: password_confirmation,
      reset_sent_at: nil,
      reset_digest: nil,
    )
  end

  private

  def check_reset_expired
    if account.reset_sent_at <= 2.hours.ago
      raise Service::Error.new("Password reset has expired")
    end
  end

  def validate_token
    valid = BCrypt::Password.new(account.reset_digest).is_password?(token)
    return if valid
    raise Service::Error.new("Invalid token")
  end
end