# Returns a JWT for a given account.
# @param account The account that the JWT should represent.
class Accounts::JWT < ApplicationService
  attr_reader :account

  def initialize(account)
    @account = account
  end

  def call
    JWT.encode token_payload, ENV["JWT_SECRET"], 'HS256'
  end

  def token_payload
    {
      sub: account.uid,
      exp: (Time.now + 30.days).to_i
    }
  end
end