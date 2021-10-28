# frozen_string_literal: true

module Guild
  class BasePolicy < BasePolicy
    def accepted?
      current_user&.accepted?
    end
  end
end
