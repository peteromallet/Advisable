# frozen_string_literal: true

class DropCallRequestedAtFromInterview < ActiveRecord::Migration[7.0]
  def up
    remove_column :interviews, :call_requested_at
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
