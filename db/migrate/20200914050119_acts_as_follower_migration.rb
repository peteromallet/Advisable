class ActsAsFollowerMigration < ActiveRecord::Migration[6.0]
  def self.up
    create_table :follows, force: true, type: :uuid do |t|
      t.references :followable, polymorphic: true, null: false, type: :uuid
      t.references :follower, polymorphic: true, null: false
      t.boolean :blocked, default: false, null: false
      t.timestamps
    end

    add_index :follows, %w[follower_id follower_type], name: 'fk_follows'
    add_index :follows,
              %w[followable_id followable_type],
              name: 'fk_followables'
  end

  def self.down
    drop_table :follows
  end
end
