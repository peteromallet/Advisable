# frozen_string_literal: true

class AddUidToInvoices < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_column :invoices, :uid, :string
    add_index :invoices, :uid, algorithm: :concurrently
  end
end
