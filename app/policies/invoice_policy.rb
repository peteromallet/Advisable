# frozen_string_literal: true

class InvoicePolicy < BasePolicy
  def finalize?
    owner? || admin?
  end

  private

  def owner?
    record.application.specialist == current_user
  end
end
