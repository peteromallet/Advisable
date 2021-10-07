# frozen_string_literal: true

class RefreshCaseStudySearchesJob < ApplicationJob
  def perform
    users = User.joins(:account).accepted.where(id: CaseStudy::Search.distinct.select(:user_id))
    users.each do |user|
      updated_searches = {}
      user.searches.each do |search|
        existing_results = search.result_ids
        search.refresh_results!
        refreshed_results = search.result_ids
        new_results = refreshed_results - existing_results
        next if new_results.none?

        updated_searches[search.id] = new_results
      end

      next if updated_searches.none?

      UserMailer.case_study_searches_refreshed(user, updated_searches)
    end
  end
end
