# frozen_string_literal: true

class CreateAgreements < ActiveRecord::Migration[6.1]
  def change
    create_table :agreements do |t|
      t.string :uid, null: false
      t.references :user, null: false, foreign_key: true
      t.references :company, type: :uuid, null: false, foreign_key: true
      t.references :specialist, null: false, foreign_key: true
      t.string :collaboration
      t.string :invoicing
      t.string :status
      t.integer :hourly_rate

      t.timestamps

      t.index :uid, unique: true
    end
  end
end
