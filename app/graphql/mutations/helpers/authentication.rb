# frozen_string_literal: true

module Mutations::Helpers::Authentication
  delegate :logout, to: :session_manager

  def session_manager
    context[:session_manager]
  end

  def login_as(account)
    context[:current_user] = account.specialist_or_user
    session_manager.login(account)
  end
end
