# frozen_string_literal: true

class AddPdfKeyToPayments < ActiveRecord::Migration[7.0]
  def change
    add_column :payments, :pdf_key, :string
  end
end
