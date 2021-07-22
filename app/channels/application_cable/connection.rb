# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user, :current_account

    def connect
      self.current_user = session_manager.current_user
      self.current_account = session_manager.current_account
    end

    private

    def session_manager
      @session_manager ||= SessionManager.new(session: @request.session, cookies: cookies)
    end
  end
end
