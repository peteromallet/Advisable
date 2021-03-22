# frozen_string_literal: true

class RemoveFollows < ActiveRecord::Migration[6.1]
  def up
    drop_table :follows
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
