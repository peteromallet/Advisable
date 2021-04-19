# frozen_string_literal: true

class AddLogidzeToCaseStudyArticles < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_articles, :log_data, :jsonb

    reversible do |dir|
      dir.up do
        create_trigger :logidze_on_case_study_articles, on: :case_study_articles
      end

      dir.down do
        execute "DROP TRIGGER IF EXISTS logidze_on_case_study_articles on case_study_articles;"
      end
    end
  end
end
