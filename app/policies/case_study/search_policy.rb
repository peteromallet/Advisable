# frozen_string_literal: true

module CaseStudy
  class SearchPolicy < BasePolicy
    def read?
      user_owner? || admin?
    end
    alias archive_article? read?
    alias delete? read?
    alias finalize? read?
    alias update? read?
  end
end
