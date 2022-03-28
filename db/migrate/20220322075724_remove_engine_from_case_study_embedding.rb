# frozen_string_literal: true

class RemoveEngineFromCaseStudyEmbedding < ActiveRecord::Migration[7.0]
  def change
    remove_column :case_study_embeddings, :engine, :string
  end
end
