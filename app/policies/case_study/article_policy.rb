# frozen_string_literal: true

module CaseStudy
  class ArticlePolicy < BasePolicy
    def approve?
      specialist_owner? || admin?
    end
  end
end
