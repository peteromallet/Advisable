# frozen_string_literal: true

class AgreementPolicy < BasePolicy
  def accept?
    owned_by_user_or_company? || admin?
  end
  alias_method :decline?, :accept?
end
