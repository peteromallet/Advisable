# frozen_string_literal: true

class InterviewPolicy < BasePolicy
  def read?
    participant? || admin?
  end
  alias resend_request? read?
  alias request_reschedule? read?
  alias request_more_times? read?
  alias invite_user? read?
  alias reschedule? read?
  alias schedule? read?
  alias decline? read?

  private

  def participant?
    record.accounts.include?(current_user.account)
  end
end
