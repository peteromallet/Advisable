# frozen_string_literal: true

class AddArchivedToCaseStudySearch < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :archived, :jsonb
  end
end
