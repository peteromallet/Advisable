class CreateGuildComments < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_comments, id: :uuid do |t|
      t.text :body, null: false
      t.integer :reactionable_count, default: 0, null: false
      t.references :guild_post, foreign_key: {on_delete: :cascade}, type: :uuid
      t.references :specialist, foreign_key: {on_delete: :cascade}
      t.references :parent_comment, type: :uuid
      t.integer :status, null: false, default: 0

      t.jsonb :data

      t.timestamps
    end
  end
end
