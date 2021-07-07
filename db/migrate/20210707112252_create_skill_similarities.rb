# frozen_string_literal: true

class CreateSkillSimilarities < ActiveRecord::Migration[6.1]
  def change
    create_table :skill_similarities do |t|
      t.references :skill1, null: false, foreign_key: {to_table: :skills}
      t.references :skill2, null: false, foreign_key: {to_table: :skills}
      t.integer :similarity, null: false

      t.index %i[skill1_id skill2_id], unique: true

      t.timestamps
    end
  end
end
