class CreateBookings < ActiveRecord::Migration[5.2]
  def change
    create_table :bookings do |t|
      t.string :type
      t.decimal :rate
      t.string :rate_type
      t.decimal :rate_limit
      t.string :status
      t.string :duration
      t.jsonb :deliverables
      t.string :decline_reason
      t.string :airtable_id, index: true
      t.belongs_to :application, foreign_key: true

      t.timestamps
    end
  end
end
