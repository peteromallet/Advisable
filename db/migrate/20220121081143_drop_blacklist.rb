# frozen_string_literal: true

class DropBlacklist < ActiveRecord::Migration[7.0]
  def change
    drop_table :blacklisted_domains # rubocop:disable Rails/ReversibleMigration
  end
end
