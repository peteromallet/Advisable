# frozen_string_literal: true

class CaseStudyArticleRoundupJob < ApplicationJob
  AMOUNT_OF_ARTICLES = 3
  MIN_SCORE = 60

  queue_as :case_studies

  def perform
    account_ids = CaseStudy::Interest.all.distinct.pluck(:account_id)
    Account.where(id: account_ids).find_each do |account|
      next if account.unsubscribed?("Weekly Digest")

      already_showcased = account.showcased_articles
      relevant_articles = CaseStudy::Article.where.not(id: already_showcased).where(score: MIN_SCORE..)
      article_ids = relevant_articles.trending.first(AMOUNT_OF_ARTICLES).pluck(:id)

      if article_ids.size == AMOUNT_OF_ARTICLES
        account.update!(showcased_articles: already_showcased + article_ids)
        UserMailer.case_study_article_roundup(account.user, article_ids).deliver_later
      end
    end
  end
end
