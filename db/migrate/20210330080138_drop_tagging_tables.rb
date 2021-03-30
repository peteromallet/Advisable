# frozen_string_literal: true

class DropTaggingTables < ActiveRecord::Migration[6.1]
  def up
    safety_assured do
      remove_column :subscriptions, :tag_id

      drop_table :taggings
      drop_table :tags
    end
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
