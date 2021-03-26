class AddLabelToGuildPosts < ActiveRecord::Migration[6.1]
  disable_ddl_transaction!

  def change
    add_reference :guild_posts, :label, index: {algorithm: :concurrently}, type: :uuid
  end
end
