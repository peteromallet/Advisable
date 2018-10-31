class CreateInterviews < ActiveRecord::Migration[5.2]
  def change
    create_table :interviews do |t|
      t.belongs_to :application, foreign_key: true
      t.datetime :starts_at
      t.text :availability
      t.string :status
      t.string :time_zone
      t.string :airtable_id, index: true

      t.timestamps
    end
  end
end
