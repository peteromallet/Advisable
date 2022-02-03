# frozen_string_literal: true

class PaymentRequestPolicy < BasePolicy
  def read?
    specialist_owner? || company_user? || admin?
  end

  def approve?
    company_user? || admin?
  end
  alias dispute? approve?

  def cancel?
    specialist_owner? || admin?
  end

  private

  def company_user?
    current_user.respond_to?(:company_id) && record.company_id == current_user.company_id
  end
end
