# Sends a password reset email to a given account. An account can either be
# a user or specialist.
# @param account The account that the password request is being sent for.
class Accounts::RequestPasswordReset < ApplicationService
  attr_reader :account

  def initialize(account)
    @account = account
  end

  def call
    account.update_attributes({
      reset_digest: Token.digest(token),
      reset_sent_at: Time.zone.now
    })

    AccountMailer.reset_password(uid: account.uid, token: token).deliver_later
  end

  private

  def token
    @token ||= Token.new
  end
end