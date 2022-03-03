# frozen_string_literal: true

class RemoveMatch < ActiveRecord::Migration[7.0]
  def up
    drop_table :matches
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
