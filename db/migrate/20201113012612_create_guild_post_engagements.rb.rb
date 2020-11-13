class CreateGuildPostEngagements < ActiveRecord::Migration[6.0]
  def change
    create_table :guild_post_engagements, type: :uuid do |t|
      t.references :specialist, foreign_key: true
      t.references :guild_post, foreign_key: true, type: :uuid
      t.timestamps
    end
  end
end
