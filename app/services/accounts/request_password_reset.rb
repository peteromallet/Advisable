# Sends a password reset email to a given account. An account can either be
# a user or specialist.
# @param email The email that the password request is being sent for.
class Accounts::RequestPasswordReset < ApplicationService
  attr_reader :account

  def initialize(email)
    @account = Account.find_by!(email: email)
  rescue ActiveRecord::RecordNotFound
    raise Service::Error.new("request_password_reset.account_not_found")
  end

  def call
    has_password?
    account.update({reset_digest: Token.digest(token), reset_sent_at: Time.zone.now})
    AccountMailer.reset_password(uid: account.specialist_or_user.uid, token: token).deliver_later
  end

  private

  def has_password?
    return if account.has_password? || account.specialist.blank?

    WebhookEvent.trigger("specialists.forgotten_password_for_non_account", WebhookEvent::Specialist.data(account.specialist))
    raise Service::Error.new("request_password_reset.application_required")
  end

  def token
    @token ||= Token.new
  end
end
