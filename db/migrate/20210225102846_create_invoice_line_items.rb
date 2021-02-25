# frozen_string_literal: true

class CreateInvoiceLineItems < ActiveRecord::Migration[6.1]
  def change
    create_table :invoice_line_items, id: :uuid do |t|
      t.references :invoice, null: false, foreign_key: true, type: :uuid
      t.references :task, foreign_key: true
      t.string :stripe_invoice_line_item_id
      t.string :name
      t.integer :amount

      t.timestamps
    end
  end
end
