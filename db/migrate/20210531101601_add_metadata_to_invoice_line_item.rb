# frozen_string_literal: true

class AddMetadataToInvoiceLineItem < ActiveRecord::Migration[6.1]
  def change
    add_column :invoice_line_items, :metadata, :jsonb
  end
end
