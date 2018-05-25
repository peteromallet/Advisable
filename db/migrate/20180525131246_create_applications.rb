class CreateApplications < ActiveRecord::Migration[5.2]
  def change
    create_table :applications do |t|
      t.integer :rate
      t.string :availability
      t.string :status
      t.text :introduction
      t.jsonb :questions
      t.belongs_to :specialist, foreign_key: true
      t.belongs_to :project, foreign_key: true
      t.string :airtable_id

      t.timestamps
    end
  end
end
