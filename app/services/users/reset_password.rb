class Users::ResetPassword < ApplicationService
  attr_reader :user, :token, :password, :password_confirmation

  def initialize(user:, token:, password:, password_confirmation:)
    @user = user
    @token = token
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    validate_token
    check_reset_expired
    user.update_attributes(
      password: password,
      password_confirmation: password_confirmation,
      reset_sent_at: nil,
      reset_digest: nil,
    )
  end

  private

  def check_reset_expired
    if user.reset_sent_at <= 2.hours.ago
      raise Service::Error.new("Password reset has expired")
    end
  end

  def validate_token
    valid = BCrypt::Password.new(user.reset_digest).is_password?(token)
    return if valid
    raise Service::Error.new("Invalid token")
  end
end