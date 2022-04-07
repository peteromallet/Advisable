# frozen_string_literal: true

class RemoveFieldsFromCaseStudyInterests < ActiveRecord::Migration[7.0]
  def change
    remove_column :case_study_interests, :article_ids, :jsonb
    remove_column :case_study_interests, :min_score, :decimal
  end
end
