# frozen_string_literal: true

class PopulateInvoiceRateOnApplication < ActiveRecord::Migration[6.1]
  class MigrationApplication < ActiveRecord::Base
    self.table_name = :applications
  end

  def up
    rates = MigrationApplication.pluck(:id, :rate).to_h
    MigrationApplication.find_each do |app|
      invoice_rate = ((rates[app.id].presence || 0) * 100).ceil
      app.update_columns(invoice_rate: invoice_rate)
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
