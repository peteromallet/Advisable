# frozen_string_literal: true

namespace :migrate do
  task archived_articles: :environment do
    articles_by_users = CaseStudy::ArchivedArticle.select("user_id, array_agg(article_id) articles").group(:user_id)
    articles_by_users.each do |archived|
      CaseStudy::Search.
        where(user_id: archived.user_id).
        update_all(archived: archived.articles)
    end
  end
end
