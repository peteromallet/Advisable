# frozen_string_literal: true

module CaseStudy
  class Search < ApplicationRecord
    include Uid
    uid_prefix "csr"

    RESULT_LIMIT = 5

    has_logidze

    belongs_to :user
    has_many :skills, dependent: :destroy
    has_many :search_feedbacks, dependent: :destroy

    before_save :uniq_archived

    def name
      super.presence || (skills.primary.first || skills.first)&.skill&.name
    end

    def archived
      super.presence || []
    end

    def result_ids
      attributes["results"] || []
    end

    def existing_or_archived
      result_ids + archived
    end

    def active_result_ids
      result_ids - archived
    end

    def results
      refresh_results! if result_ids.blank?

      Article.searchable.
        where(id: active_result_ids).
        available_specialists.
        by_score
    end

    def refresh_results!
      amount_to_add = RESULT_LIMIT - (result_ids - archived).size
      return if amount_to_add <= 0

      new_results = results_query(limit: amount_to_add, exclude: existing_or_archived).map(&:id)
      update!(results: result_ids + new_results)
    end

    def weighted_results(limit: nil, exclude: nil)
      skill_counts = CaseStudy::Skill.where(article_id: selected).group(:skill_id).count
      relevant = results_query(exclude: exclude).pluck(:id, :score)
      relevant_skills = CaseStudy::Skill.where(article_id: relevant.map(&:first)).pluck(:article_id, :skill_id).group_by(&:first)
      weighted = relevant.sort_by do |article_id, article_score|
        score = article_score / 10.0
        relevant_skills[article_id].each do |_article_id, skill_id|
          score += skill_counts[skill_id] if skill_counts[skill_id]
        end
        score
      end.last(limit)
      Article.where(id: weighted.map(&:first))
    end

    def results_query(limit: nil, exclude: nil)
      query = Article.distinct.searchable
      query = query.limit(limit) if limit.present?
      query = query.where.not(id: exclude) if exclude.present?
      if skills.any?
        query = query.joins(:skills).where(case_study_skills: {skill_id: skills.pluck(:skill_id)})
      elsif goals.present?
        query = query.where("goals ?| array[:goals]", goals: goals)
      end
      query
    end

    private

    def uniq_archived
      self.archived = archived.uniq
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
#  finalized_at  :datetime
#  goals         :jsonb
#  name          :string
#  preferences   :jsonb
#  results       :jsonb
#  selected      :jsonb
#  uid           :string           not null
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  user_id       :bigint           not null
#
# Indexes
#
#  index_case_study_searches_on_uid      (uid) UNIQUE
#  index_case_study_searches_on_user_id  (user_id)
#
# Foreign Keys
#
#  fk_rails_...  (user_id => users.id)
#
