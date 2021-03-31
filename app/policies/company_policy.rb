# frozen_string_literal: true

class CompanyPolicy < BasePolicy
  def read?
    owned_by_company? || admin?
  end

  private

  def company_of_record
    record
  end
end
