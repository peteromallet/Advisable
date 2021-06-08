# frozen_string_literal: true

class DropPreviousProjectImageTable < ActiveRecord::Migration[6.1]
  def up
    safety_assured { drop_table :previous_project_images }
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
