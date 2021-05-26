# frozen_string_literal: true

module CaseStudy
  class Search < ApplicationRecord
    include Uid
    uid_prefix "csr"

    RESULT_LIMIT = 12

    has_logidze

    belongs_to :user
    has_many :skills, dependent: :destroy
    has_many :search_feedbacks, dependent: :destroy

    def results(fresh: false)
      if fresh || attributes["results"].blank?
        query = Article.distinct.where.not(id: archived).limit(RESULT_LIMIT)
        query = query.where(company_type: business_type) if business_type.present?
        if skills.any?
          query = query.joins(:skills).where(case_study_skills: {skill_id: skills.pluck(:skill_id)})
        elsif goals.present?
          query = query.where("goals ?| array[:goals]", goals: goals)
        end
        update(results: query.pluck(:id))
        query
      else
        Article.where(id: attributes["results"]).where.not(id: archived)
      end
    end

    def archived
      attributes["archived"].presence || []
    end

    def saved
      attributes["saved"].presence || []
    end

    def archived_articles
      Article.where(id: archived)
    end

    def saved_articles
      Article.where(id: saved)
    end
  end
end

# == Schema Information
#
# Table name: case_study_searches
#
#  id            :bigint           not null, primary key
#  archived      :jsonb
#  business_type :string
#  goals         :jsonb
#  name          :string
#  results       :jsonb
#  saved         :jsonb
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_case_study_searches_on_uid      (uid)
#  index_case_study_searches_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
