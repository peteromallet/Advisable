# Sends a password reset email to a given account. An account can either be
# a user or specialist.
# @param email The email that the password request is being sent for.
class Accounts::RequestPasswordReset < ApplicationService
  attr_reader :specialist_or_user

  # TODO: AccountMigration - Make this better
  def initialize(email)
    @specialist_or_user = Account.find_by!(email: email).specialist_or_user
  rescue ActiveRecord::RecordNotFound
    raise Service::Error.new("request_password_reset.account_not_found")
  end

  def call
    has_password?
    specialist_or_user.update({
      reset_digest: Token.digest(token),
      reset_sent_at: Time.zone.now
    })

    AccountMailer.reset_password(uid: specialist_or_user.uid, token: token).deliver_later
  end

  private

  def has_password?
    return if specialist_or_user.has_password?

    if specialist_or_user.is_a?(Specialist)
      WebhookEvent.trigger(
        "specialists.forgotten_password_for_non_account",
        WebhookEvent::Specialist.data(specialist_or_user)
      )

      raise Service::Error.new("request_password_reset.application_required")
    end
  end

  def token
    @token ||= Token.new
  end
end
