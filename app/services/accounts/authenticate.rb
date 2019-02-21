# Takes a given JWT and returns the account that it represents.
#
# === example
#  user = Accounts::Authenticate.call("...")
class Accounts::Authenticate < ApplicationService
  attr_reader :token

  def initialize(token)
    @token = token
  end

  def call
    return nil unless token.present?
    Account.find_by_uid(payload["sub"])
  rescue JWT::VerificationError => e
  rescue JWT::ExpiredSignature => e
  rescue JWT::DecodeError => e
    return nil
  end

  private

  def payload
    decoded[0]
  end

  def decoded
    JWT.decode token, ENV["JWT_SECRET"], true, { algorithm: 'HS256' }
  end
end