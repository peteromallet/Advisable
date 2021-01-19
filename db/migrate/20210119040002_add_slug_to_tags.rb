# frozen_string_literal: true

class AddSlugToTags < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def up
    add_column :tags, :slug, :string
    add_index :tags, :slug, unique: true, algorithm: :concurrently

    # Friendly_id will generate slugs on save
    Guild::Topic.find_each(&:save)
  end

  def down
    remove_column :tags, :slug
  end
end
