# frozen_string_literal: true

class DropIgnoredColums < ActiveRecord::Migration[7.0]
  def up
    remove_column :client_calls, :project_id
    remove_column :interviews, :application_id
    remove_column :payments, :task_id
    remove_column :payouts, :task_id
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
