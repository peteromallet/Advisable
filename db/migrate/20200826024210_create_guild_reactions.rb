class CreateGuildReactions < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_reactions, id: :uuid do |t|
      t.references :reactionable, polymorphic: true, type: :uuid
      t.references :specialist, foreign_key: {on_delete: :cascade}
      t.integer :kind, null: false, default: 0 #like
      t.integer :status, null: false, default: 0
      t.jsonb :data
      t.timestamps
    end

    # add_index :reactions, [:reactionable_type, :reactionable_id]
  end
end
