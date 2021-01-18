# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_account

    def connect
      self.current_account = find_verified_user
    end

    private

    def find_verified_user
      if (verified_user = Account.find_by_uid(cookies.encrypted['_advisable_session']['account_uid']))
        verified_user
      else
        reject_unauthorized_connection
      end
    end
  end
end
