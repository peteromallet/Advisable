# frozen_string_literal: true

class DropClientCall < ActiveRecord::Migration[7.0]
  def up
    drop_table :client_calls
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
