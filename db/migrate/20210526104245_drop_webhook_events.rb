# frozen_string_literal: true

class DropWebhookEvents < ActiveRecord::Migration[6.1]
  def up
    drop_table :webhook_events
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
