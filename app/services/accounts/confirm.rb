# Used to confirm an account.
# @param account The account that is being confirmed. This can be any record
# that incldues the Account module.
# @param token The confirmation token. This must correspond to the
# confirmation_digest that was set when the confirmation request was sent. See
# account.rb for how confirmation_digest is generated.
class Accounts::Confirm < ApplicationService
  attr_reader :account, :token

  def initialize(account:, token:)
    @account = account
    @token = token
  end

  def call
    validate_token
    if account.confirmed
      raise Service::Error.new("Already confirmed")
    end

    account.confirmed_at = DateTime.now
    account.confirmation_digest = nil
    account.save(validate: false)
    account
  end

  private

  def validate_token
    valid = BCrypt::Password.new(account.confirmation_digest).is_password?(token)
    return if valid
    raise Service::Error.new("Invalid token")
  end
end