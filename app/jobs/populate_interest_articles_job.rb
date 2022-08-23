# frozen_string_literal: true

class PopulateInterestArticlesJob < ApplicationJob
  queue_as :case_studies

  def perform(interest_ids)
    interests = CaseStudy::Interest.where(id: interest_ids)
    return if interests.blank?

    account = interests.first.account
    interests.each(&:find_articles!)
    AdvisableSchema.subscriptions.trigger("feedUpdated", {}, {}, scope: account.id)
  end
end
