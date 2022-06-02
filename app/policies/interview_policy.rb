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

  def schedule?
    specialist_owner? || admin?
  end
  alias decline? schedule?

  private

  def participant?
    record.accounts.include?(current_user.account)
  end
end
