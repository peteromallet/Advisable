# frozen_string_literal: true

module CaseStudy
  class SharedArticlePolicy < BasePolicy
    def archive?
      user_owner? || admin?
    end

    private

    def user_owner?
      record.shared_with == current_user
    end
  end
end
