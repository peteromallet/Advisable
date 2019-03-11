class Users::Confirm < ApplicationService
  attr_reader :user, :token

  def initialize(user:, token:)
    @user = user
    @token = token
  end

  def call
    if user.confirmed
      raise Service::Error.new("accounts.already_confirmed")
    end

    validate_token
    user.confirmed_at = DateTime.now
    user.confirmation_digest = nil
    user.save(validate: false)
    user
  end

  private

  def validate_token
    begin
      valid = BCrypt::Password.new(user.confirmation_digest).is_password?(token)
      return if valid
      raise Service::Error.new("accounts.invalid_token")
    rescue BCrypt::Errors::InvalidHash => e
      raise Service::Error.new("accounts.invalid_token")
    end
  end
end