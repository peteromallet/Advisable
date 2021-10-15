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

    def results
      refresh_results! if result_ids.blank?

      Article.published.active.
        where(id: active_result_ids).
        available_specialists.
        by_score
    end

    def refresh_results!
      amount_to_add = RESULT_LIMIT - (result_ids - archived).size
      return if amount_to_add <= 0

      existing_or_archived = result_ids + archived
      new_results = results_query(limit: amount_to_add, exclude: existing_or_archived).map(&:id)
      update!(results: result_ids + new_results)
    end

    def active_result_ids
      result_ids - archived
    end

    def results_query(limit: nil, exclude: nil)
      query = Article.distinct.published.active
      query = query.limit(limit) if limit.present?
      query = query.where.not(id: exclude) if exclude.present?
      if skills.any?
        query = query.joins(:skills).where(case_study_skills: {skill_id: skills.pluck(:skill_id)})
      elsif goals.present?
        query = query.where("goals ?| array[:goals]", goals: goals)
      end
      query.by_score
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
