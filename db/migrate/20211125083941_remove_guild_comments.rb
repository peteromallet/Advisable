# frozen_string_literal: true

class RemoveGuildComments < ActiveRecord::Migration[6.1]
  def change
    drop_table :guild_comments # rubocop:disable Rails/ReversibleMigration
  end
end
