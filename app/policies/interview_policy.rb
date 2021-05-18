# frozen_string_literal: true

class InterviewPolicy < BasePolicy
  def read?
    specialist_owner? || owned_by_user_or_company? || admin?
  end
  alias resend_request? read?

  def schedule?
    specialist_owner? || admin?
  end
end
