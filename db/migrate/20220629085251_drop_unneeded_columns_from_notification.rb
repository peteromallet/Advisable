# frozen_string_literal: true

class DropUnneededColumnsFromNotification < ActiveRecord::Migration[7.0]
  def up
    remove_column :notifications, :notifiable_type
    remove_column :notifications, :notifiable_id
    remove_column :notifications, :actor_id
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
