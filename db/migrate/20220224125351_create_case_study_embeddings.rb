# frozen_string_literal: true

class CreateCaseStudyEmbeddings < ActiveRecord::Migration[7.0]
  def change
    create_table :case_study_embeddings do |t|
      t.references :article, null: false, foreign_key: {to_table: :case_study_articles}
      t.string :engine
      t.jsonb :data

      t.timestamps
    end
  end
end
