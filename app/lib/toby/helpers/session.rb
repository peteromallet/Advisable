# frozen_string_literal: true

module Toby
  module Helpers
    module Session
      def session_manager
        context[:session_manager]
      end

      def current_account_id
        session_manager.current_account.id
      end

      def current_account_responsible_for(&)
        Logidze.with_responsible(current_account_id, &)
      end
    end
  end
end
