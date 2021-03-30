# frozen_string_literal: true

class CreateSpecialistIndustries < ActiveRecord::Migration[6.1]
  def change
    create_table :specialist_industries do |t|
      t.belongs_to :specialist, null: false, foreign_key: true
      t.belongs_to :industry, null: false, foreign_key: true

      t.timestamps
    end
  end
end
