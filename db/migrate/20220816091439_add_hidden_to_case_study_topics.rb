# frozen_string_literal: true

class AddHiddenToCaseStudyTopics < ActiveRecord::Migration[7.0]
  def change
    add_column :case_study_topics, :hidden, :boolean
  end
end
