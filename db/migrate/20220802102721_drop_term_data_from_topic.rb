# frozen_string_literal: true

class DropTermDataFromTopic < ActiveRecord::Migration[7.0]
  def change
    remove_column :case_study_topics, :term, :citext
    remove_column :case_study_topics, :term_data, :jsonb
  end
end
