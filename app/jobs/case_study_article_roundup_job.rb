# frozen_string_literal: true

class CaseStudyArticleRoundupJob < ApplicationJob
  queue_as :default

  def perform
    account_ids = CaseStudy::Interest.all.distinct.pluck(:account_id)
    Account.where(id: account_ids).find_each do |account|
      next if account.unsubscribed?("Case Study Article Roundup")

      UserMailer.case_study_article_roundup(account.user, []).deliver_later
    end
  end
end
