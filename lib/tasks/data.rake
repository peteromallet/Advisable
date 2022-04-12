# frozen_string_literal: true

require "ruby-progressbar"
require_relative "../../config/environment"

namespace :data do
  task prepare: :environment do
    TestData.new.seed!
  end

  task create_file: :environment do
    ProductionData.new.create_file!
  end

  task migrate_cs_searches: :environment do
    progressbar = ProgressBar.create(format: "Migrating searches: %a %b\u{15E7}%i %p%% %e", progress_mark: " ", remainder_mark: "\u{FF65}", total: CaseStudy::Search.count)

    CaseStudy::Search.includes(skills: :skill).includes(:user).find_each do |search|
      progressbar.increment

      ActiveRecord::Base.transaction do
        interest = interest_from_search(search)
        next unless interest

        copy_search_results(search, interest)
        add_relevant_articles(search, interest)
      end
    end
  end
end

def interest_from_search(search)
  interest = CaseStudy::Interest.new(account_id: search.user.account_id)
  goals = Array(search.goals).to_sentence
  skills = search.skills.map(&:skill).map(&:name).to_sentence
  interest.term = [goals, skills].filter_map(&:presence).join(" with ")
  return unless interest.valid?

  interest.term_vector
  interest.save!
  interest
end

def copy_search_results(search, interest)
  treshold = 1.0
  CaseStudy::Article.where(id: search.result_ids).find_each do |article|
    similarity = article.embedding.cosine_similarity_with(interest.term_vector)
    treshold = similarity if similarity < treshold
    interest.interest_articles.create!(article:, similarity:)
  end
  interest.update!(treshold:)
end

def add_relevant_articles(search, interest)
  articles = interest.articles_by_relevancy.
    select { |a| a[:similarity] >= interest.treshold }.
    reject { |a| search.result_ids.include?(a[:article_id]) }
  interest.interest_articles.insert_all!(articles)
end
