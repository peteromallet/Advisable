# Authenticates a given JWT and returns the user record.
class Users::Authenticate < ApplicationService
  attr_reader :token

  def initialize(token:)
    @token = token
  end

  def call
    return nil unless token.present?
    User.find_by_uid(payload["sub"])
  end

  private

  def payload
    decoded[0]
  end

  def decoded
    JWT.decode token, ENV["JWT_SECRET"], true, { algorithm: 'HS256' }
  end
end