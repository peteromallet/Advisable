# frozen_string_literal: true

module CaseStudy
  class ArticlePolicy < BasePolicy
    def approve?
      specialist_owner? || admin?
    end

    def publish?
      editor? || admin?
    end

    def read_company?
      return true unless record.confidential

      specialist_owner? || editor? || admin?
    end
  end
end
