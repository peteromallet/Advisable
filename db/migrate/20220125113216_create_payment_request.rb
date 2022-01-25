# frozen_string_literal: true

class CreatePaymentRequest < ActiveRecord::Migration[7.0]
  def change
    create_table :payment_requests do |t|
      t.string :uid, null: false
      t.references :specialist, null: false, foreign_key: true
      t.references :company, type: :uuid, null: false, foreign_key: true
      t.string :status, null: false
      t.integer :amount

      t.timestamps
      t.index :uid, unique: true
    end
  end
end
