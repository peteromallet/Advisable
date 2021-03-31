# frozen_string_literal: true

class CompanyPolicy < BasePolicy
  def read?
    company_owner? || admin?
  end

  private

  def company_of_record
    record
  end
end
