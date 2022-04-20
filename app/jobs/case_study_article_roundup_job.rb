# frozen_string_literal: true

class CaseStudyArticleRoundupJob < ApplicationJob
  AMOUNT_OF_ARTICLES = 3
  MIN_SCORE = 60

  queue_as :default

  def perform
    account_ids = CaseStudy::Interest.all.distinct.pluck(:account_id)
    Account.where(id: account_ids).find_each do |account|
      next if account.unsubscribed?("Weekly Digest")

      already_showcased = account.showcased_articles
      potential_article_ids = account.interest_articles.where.not(article_id: already_showcased).distinct.select(:article_id)
      article_ids = CaseStudy::Article.where(id: potential_article_ids).where(score: MIN_SCORE..).pluck(:id).sample(AMOUNT_OF_ARTICLES)

      if article_ids.size == AMOUNT_OF_ARTICLES
        account.update!(showcased_articles: already_showcased + article_ids)
        UserMailer.case_study_article_roundup(account.user, article_ids).deliver_later
      end
    end
  end
end
