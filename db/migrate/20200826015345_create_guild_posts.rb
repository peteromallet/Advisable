class CreateGuildPosts < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_posts, id: :uuid do |t|
      t.string :type, null: false, default: "Post"
      t.text :body, null: false
      t.text :body_raw, null: false, default: ''
      t.string :title, null: false
      t.integer :status, null: false, default: 0 # draft
      t.integer :audience, null: false, default: 0 # everyone
      t.boolean :commentable, null: false, default: true
      t.integer :comments_count, default: 0, null: false
      t.boolean :reactionable, null: false, default: true
      t.integer :reactionable_count, default: 0, null: false
      t.references :specialist, foreign_key: true
      t.jsonb :data, null: false, default: {}

      t.timestamps
    end

    add_index :guild_posts, :data, using: :gin
  end
end
