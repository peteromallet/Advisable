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

    def name
      attributes["name"].presence || (skills.primary.first || skills.first)&.skill&.name
    end

    def results
      if attributes["results"].blank?
        query = results_query(limit: RESULT_LIMIT, exclude: user.archived_articles.pluck(:article_id))
        update(results: query.pluck(:id))
      end

      Article.where(id: attributes["results"]).where.not(id: user.archived_articles.pluck(:article_id))
    end

    def results_query(limit: nil, exclude: nil)
      query = Article.distinct
      query = query.limit(limit) if limit.present?
      query = query.where.not(id: exclude) if exclude.present?
      query = query.where(company_type: business_type) if business_type.present?
      if skills.any?
        query = query.joins(:skills).where(case_study_skills: {skill_id: skills.pluck(:skill_id)})
      elsif goals.present?
        query = query.where("goals ?| array[:goals]", goals: goals)
      end
      query
    end
  end
end

# == Schema Information
#
# Table name: case_study_searches
#
#  id                    :bigint           not null, primary key
#  business_type         :string
#  company_recomendation :boolean
#  goals                 :jsonb
#  name                  :string
#  results               :jsonb
#  uid                   :string           not null
#  created_at            :datetime         not null
#  updated_at            :datetime         not null
#  user_id               :bigint           not null
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
