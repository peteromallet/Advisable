# frozen_string_literal: true

class AddCaseStudyArticleToGuildPosts < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      add_reference :guild_posts, :article, foreign_key: {to_table: :case_study_articles}
    end
  end
end
