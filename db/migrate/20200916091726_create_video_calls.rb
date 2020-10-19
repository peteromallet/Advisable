class CreateVideoCalls < ActiveRecord::Migration[6.0]
  def change
    create_table :video_calls do |t|
      t.string :uid, index: true
      t.belongs_to :interview, null: true, foreign_key: true

      t.timestamps
    end
  end
end
