# frozen_string_literal: true

class CreateInvoices < ActiveRecord::Migration[6.1]
  def change
    create_table :invoices do |t|
      t.integer :month, null: false
      t.integer :year, null: false
      t.references :company, null: false, foreign_key: true, type: :uuid
      t.string :key

      t.index %i[company_id year month], unique: true

      t.timestamps
    end
  end
end
