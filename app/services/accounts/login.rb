# Takes a given email and password and returns a JWT for the associated account.
# The account can be an instance of either user or specialist.
# @param [String] email The email address for the account.
# @param [String] password The password for the account.
class Accounts::Login < ApplicationService
  attr_reader :account, :password
  
  def initialize(email:, password:)
    @account = Account.find_by_email(email.downcase)
    @password = password
  end

  def call
    begin
      return token if valid_credentials?
      raise Service::Error.new("authentication.failed")

    rescue JWT::ExpiredSignature
      raise Service::Error.new("authentication.failed")
    end
  end

  private

  def valid_credentials?
    account && account.password_digest? && account.authenticate(password)
  end

  def token
    Accounts::JWT.call(account)
  end
end