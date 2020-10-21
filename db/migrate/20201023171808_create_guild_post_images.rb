class CreateGuildPostImages < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_post_images do |t|
      t.references :guild_post, foreign_key: {on_delete: :cascade}, type: :uuid
      t.string  :uid, :string, index: true
      t.integer :position
      t.boolean :cover
      t.timestamps
    end
  end
end
