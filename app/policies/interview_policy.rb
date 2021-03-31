# frozen_string_literal: true

class InterviewPolicy < BasePolicy
  def read?
    specialist_owner? || user_or_company_owner? || admin?
  end
end
