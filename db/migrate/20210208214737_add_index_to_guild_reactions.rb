# frozen_string_literal: true

class AddIndexToGuildReactions < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!
  def change
    add_index :guild_reactions, %i[specialist_id reactionable_type reactionable_id], unique: true, name: "index_guild_reactions_on_specialist_reactionable", algorithm: :concurrently
  end
end
