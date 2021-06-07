# frozen_string_literal: true

class AddUidToCaseStudySharedArticle < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_shared_articles, :uid, :string
  end
end
