# frozen_string_literal: true

class DropUnneededColumnsFromUser < ActiveRecord::Migration[7.0]
  def up
    remove_column :users, :availability
    remove_column :users, :time_zone
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
