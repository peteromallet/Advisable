# frozen_string_literal: true

class AddStatusIndexes < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_index :applications, :status, algorithm: :concurrently
    add_index :projects, :sales_status, algorithm: :concurrently
    add_index :tasks, :stage, algorithm: :concurrently
  end
end
