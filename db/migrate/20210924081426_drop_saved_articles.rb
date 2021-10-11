# frozen_string_literal: true

class DropSavedArticles < ActiveRecord::Migration[6.1]
  def up
    safety_assured do
      drop_table :case_study_saved_articles
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
