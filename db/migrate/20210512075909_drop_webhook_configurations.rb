# frozen_string_literal: true

class DropWebhookConfigurations < ActiveRecord::Migration[6.1]
  def up
    drop_table :webhook_configurations
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
