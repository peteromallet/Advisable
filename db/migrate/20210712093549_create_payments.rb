# frozen_string_literal: true

class CreatePayments < ActiveRecord::Migration[6.1]
  def change
    create_table :payments do |t|
      t.string :uid
      t.integer :amount
      t.integer :admin_fee
      t.string :status
      t.references :company, null: false, foreign_key: true, type: :uuid
      t.references :specialist, null: false, foreign_key: true
      t.references :task, foreign_key: true
      t.string :payment_intent_id

      t.timestamps
    end
  end
end
