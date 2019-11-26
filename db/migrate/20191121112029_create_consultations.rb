class CreateConsultations < ActiveRecord::Migration[6.0]
  def change
    create_table :consultations do |t|
      t.string :uid, index: true
      t.belongs_to :specialist, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true
      t.string :status
      t.string :topic
      t.jsonb :skills
      t.string :airtable_id, index: true

      t.timestamps
    end
  end
end
