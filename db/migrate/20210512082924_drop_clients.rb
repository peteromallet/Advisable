# frozen_string_literal: true

class DropClients < ActiveRecord::Migration[6.1]
  def up
    safety_assured do
      remove_column :projects, :client_id, :bigint
      drop_table :client_users
      drop_table :clients
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
