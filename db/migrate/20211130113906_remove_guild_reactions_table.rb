# frozen_string_literal: true

class RemoveGuildReactionsTable < ActiveRecord::Migration[6.1]
  def change
    drop_table :guild_reactions # rubocop:disable Rails/ReversibleMigration
  end
end
