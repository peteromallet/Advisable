class Users::Confirm < ApplicationService
  attr_reader :user, :token

  def initialize(user:, token:)
    @user = user
    @token = token
  end

  def call
    validate_token
    if user.confirmed
      raise Service::Error.new("Already confirmed")
    end

    user.confirmed_at = DateTime.now
    user.confirmation_digest = nil
    user.save(validate: false)
    user
  end

  private

  def validate_token
    valid = BCrypt::Password.new(user.confirmation_digest).is_password?(token)
    return if valid
    raise Service::Error.new("Invalid token")
  end
end