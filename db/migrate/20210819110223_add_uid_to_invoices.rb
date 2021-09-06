# frozen_string_literal: true

class AddUidToInvoices < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_column :invoices, :uid, :string, null: false # rubocop:disable Rails/NotNullColumn
    add_index :invoices, :uid, algorithm: :concurrently, unique: true
  end
end
