# frozen_string_literal: true

module CaseStudy
  class SearchPolicy < BasePolicy
    def read?
      user_owner? || admin?
    end
    alias save_article? read?
    alias update? read?
    alias delete? read?
  end
end
