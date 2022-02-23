# frozen_string_literal: true

class AccountPolicy < BasePolicy
  def current_account?
    record == current_user.account
  end
end
