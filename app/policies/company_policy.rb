# frozen_string_literal: true

class CompanyPolicy < BasePolicy
  def company_of_record
    record
  end
end
