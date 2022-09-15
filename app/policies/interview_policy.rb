# frozen_string_literal: true

class InterviewPolicy < BasePolicy
  def read?
    participant? || admin?
  end
  alias_method :resend_request?, :read?
  alias_method :request_reschedule?, :read?
  alias_method :request_more_times?, :read?
  alias_method :invite_user?, :read?
  alias_method :reschedule?, :read?
  alias_method :schedule?, :read?
  alias_method :decline?, :read?

  private

  def participant?
    record.accounts.include?(current_user.account)
  end
end
