class CreateTasks < ActiveRecord::Migration[5.2]
  def change
    create_table :tasks do |t|
      t.string :name
      t.string :uid, index: true
      t.string :airtable_id, index: true
      t.belongs_to :booking, foreign_key: true
      t.string :stage
      t.decimal :estimate
      t.datetime :due_date
      t.string :description
      t.string :submitted_for_approval_comment

      t.timestamps
    end
  end
end
