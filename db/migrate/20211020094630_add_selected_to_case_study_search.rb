# frozen_string_literal: true

class AddSelectedToCaseStudySearch < ActiveRecord::Migration[6.1]
  def change
    add_column :case_study_searches, :selected, :jsonb
  end
end
