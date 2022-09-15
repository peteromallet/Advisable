# frozen_string_literal: true

module CaseStudy
  class InterestPolicy < BasePolicy
    def read?
      user_owner? || admin?
    end
    alias_method :delete?, :read?

    def user_owner?
      record.account&.user == current_user
    end
  end
end
