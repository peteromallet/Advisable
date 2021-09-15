# frozen_string_literal: true

class PaymentPolicy < BasePolicy
  def read?
    specialist? || company_user? || admin?
  end

  def specialist?
    current_user == record.specialist
  end

  def company_user?
    record.company.user_ids.include?(current_user.id)
  end
end
