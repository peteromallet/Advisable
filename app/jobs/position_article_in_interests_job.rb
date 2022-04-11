# frozen_string_literal: true

class PositionArticleInInterestsJob < ApplicationJob
  queue_as :default

  def perform(article)
    embedding = CaseStudy::Embedding.for_article(article, refresh: true)

    article.interest_articles.find_each do |interest_article|
      similarity = embedding.cosine_similarity_with(interest_article.interest.term_vector)
      interest_article.update!(similarity:)
    end

    CaseStudy::Interest.where.not(id: article.interest_articles.distinct.select(:interest_id)).find_each do |interest|
      similarity = embedding.cosine_similarity_with(interest.term_vector)
      next if similarity < interest.treshold

      CaseStudy::InterestArticle.create!(interest:, article:, similarity:)
    end
  end
end
