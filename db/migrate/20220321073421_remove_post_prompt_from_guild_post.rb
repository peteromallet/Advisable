# frozen_string_literal: true

class RemovePostPromptFromGuildPost < ActiveRecord::Migration[7.0]
  def change
    remove_column :guild_posts, :post_prompt_id, :uuid
  end
end
