# frozen_string_literal: true

class PaymentRequestPolicy < BasePolicy
  def read?
    specialist_owner? || company_user? || admin?
  end

  private

  def company_user?
    record.company_id == current_user.company_id
  end
end
