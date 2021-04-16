# frozen_string_literal: true

class DropProjectContent < ActiveRecord::Migration[6.1]
  def up
    drop_table :project_contents
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
