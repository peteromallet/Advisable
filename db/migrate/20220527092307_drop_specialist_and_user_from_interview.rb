# frozen_string_literal: true

class DropSpecialistAndUserFromInterview < ActiveRecord::Migration[7.0]
  def up
    remove_column :interviews, :specialist_id
    remove_column :interviews, :user_id
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
