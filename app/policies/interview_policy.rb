# frozen_string_literal: true

class InterviewPolicy < BasePolicy
  def read?
    specialist_owner? || owned_by_user_or_company? || admin?
  end
  alias resend_request? read?
  alias request_reschedule? read?
  alias request_more_times? read?
  alias invite_user? read?

  def schedule?
    specialist_owner? || admin?
  end
  alias decline? schedule?
end
