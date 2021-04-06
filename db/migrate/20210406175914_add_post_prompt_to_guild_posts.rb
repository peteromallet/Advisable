# frozen_string_literal: true

class AddPostPromptToGuildPosts < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_reference :guild_posts, :post_prompt, type: :uuid, index: {algorithm: :concurrently}
  end
end
