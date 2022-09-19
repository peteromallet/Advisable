# frozen_string_literal: true

module CaseStudy
  class InterestPreviewPolicy < BasePolicy
    def read?
      user_owner? || admin?
    end

    def user_owner?
      record.account == current_user&.account
    end
  end
end
