# frozen_string_literal: true

class CompanyPolicy < BasePolicy
  def read?
    record_belongs_to_company? || admin?
  end

  private

  def company_of_record
    record
  end
end
