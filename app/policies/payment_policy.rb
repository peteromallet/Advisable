# frozen_string_literal: true

class PaymentPolicy < BasePolicy
  def read?
    specialist? || company_user? || admin?
  end

  private

  def specialist?
    current_user == record.specialist
  end

  def company_user?
    record.company_id == current_user.company_id
  end
end
