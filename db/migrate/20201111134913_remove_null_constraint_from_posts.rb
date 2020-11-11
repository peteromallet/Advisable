class RemoveNullConstraintFromPosts < ActiveRecord::Migration[6.0]
  def up
    change_column :guild_posts, :body, :text, null: true # rubocop:disable Rails/BulkChangeTable
    change_column :guild_posts, :title, :string, null: true
  end

  def down
    change_column :guild_posts, :body, :text, null: false # rubocop:disable Rails/BulkChangeTable
    change_column :guild_posts, :title, :string, null: false
  end
end
