# frozen_string_literal: true

class RefreshCaseStudySearchesJob < ApplicationJob
  def perform
    users = User.joins(:account).merge(Account.with_case_studies_feature).where(id: CaseStudy::Search.distinct.select(:user_id))
    users.each do |user|
      updated_searches = {}
      user.searches.each do |search|
        existing_results = search[:results] || []
        amount_to_add = CaseStudy::Search::RESULT_LIMIT - (existing_results - search.archived).size
        next if amount_to_add <= 0

        existing_or_archived = existing_results + search.archived
        new_results = search.results_query(limit: amount_to_add, exclude: existing_or_archived).map(&:id)
        next if new_results.none?

        search.update!(results: existing_results + new_results)
        updated_searches[search.id] = new_results
      end

      next if updated_searches.none?

      UserMailer.case_study_searches_refreshed(user, updated_searches)
    end
  end
end
