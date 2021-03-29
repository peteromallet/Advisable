# frozen_string_literal: true

class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices, id: :uuid do |t|
      t.references :company, null: false, foreign_key: true, type: :uuid
      t.references :application, null: false, foreign_key: true
      t.integer :status, default: 0
      t.string :stripe_invoice_id
      t.datetime :period_start
      t.datetime :period_end
      t.datetime :paid_at
      t.datetime :paid_out_at
      t.datetime :exported_at

      t.timestamps
    end
  end
end
