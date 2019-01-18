class CreateReviews < ActiveRecord::Migration[5.2]
  def change
    create_table :reviews do |t|
      t.string :airtable_id, index: true
      t.string :type
      t.belongs_to :specialist, foreign_key: true
      t.references :project, polymorphic: true
      t.references :reviewable, polymorphic: true
      t.text :comment
      t.jsonb :ratings

      t.timestamps
    end
  end
end