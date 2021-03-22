# frozen_string_literal: true

class CreateRecommendedSpecialists < ActiveRecord::Migration[6.1]
  def change
    create_table :recommended_specialists, id: :uuid do |t|
      t.references :specialist, foreign_key: true
      t.references :recommendation, index: true, foreign_key: {to_table: :specialists}
      t.string :match_tokens, array: true
      t.string :match_category, null: false
      t.timestamps
    end

    add_index :recommended_specialists, :match_tokens, using: 'gin'
    add_index :recommended_specialists, %i[recommendation_id specialist_id], unique: true, name: "index_recommended_spe_on_recommendation_id_and_spe_id"
  end
end
