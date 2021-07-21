# frozen_string_literal: true

module CaseStudy
  class SearchPolicy < BasePolicy
    def read?
      user_owner? || admin?
    end
    alias assign_article? read?
    alias delete? read?
    alias finalize? read?

    def update?
      !record.company_recomendation && read?
    end
  end
end
