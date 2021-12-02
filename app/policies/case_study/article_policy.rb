# frozen_string_literal: true

module CaseStudy
  class ArticlePolicy < BasePolicy
    def approve?
      specialist_owner? || admin?
    end

    def publish?
      editor? || admin?
    end

    def update?
      specialist_owner? || editor? || admin?
    end

    def read_company?
      record.confidential != true
    end
  end
end
