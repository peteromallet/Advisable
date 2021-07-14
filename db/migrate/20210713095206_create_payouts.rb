# frozen_string_literal: true

class CreatePayouts < ActiveRecord::Migration[6.1]
  def change
    create_table :payouts do |t|
      t.string :uid
      t.references :specialist, null: false, foreign_key: true
      t.references :task, foreign_key: true
      t.integer :amount
      t.integer :sourcing_fee
      t.string :status
      t.datetime :processed_at

      t.timestamps
    end
  end
end
