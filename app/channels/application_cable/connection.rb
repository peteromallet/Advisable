# frozen_string_literal: true

module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    def connect
      self.current_user = current_user
    end

    private

    def current_user
      User.first
    end
  end
end
