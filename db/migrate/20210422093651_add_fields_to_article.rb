# frozen_string_literal: true

class AddFieldsToArticle < ActiveRecord::Migration[6.1]
  def change
    change_column :case_study_articles, :comment, :text
    add_column :case_study_articles, :editor_note, :text
    add_column :case_study_articles, :freelancer_edits, :text
  end
end
