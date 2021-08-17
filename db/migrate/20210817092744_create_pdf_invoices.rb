# frozen_string_literal: true

class CreatePdfInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :pdf_invoices do |t|
      t.integer :month
      t.integer :year
      t.references :company, null: false, foreign_key: true, type: :uuid
      t.string :key

      t.timestamps
    end
  end
end
