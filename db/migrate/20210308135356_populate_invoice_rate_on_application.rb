# frozen_string_literal: true

class PopulateInvoiceRateOnApplication < ActiveRecord::Migration[6.1]
  def up
    rates = Application.pluck(:id, :rate).to_h
    Application.find_each do |app|
      invoice_rate = ((rates[app.id].presence || 0) * 100).ceil
      app.update_columns(invoice_rate: invoice_rate) # rubocop:disable Rails/SkipsModelValidations
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
