# frozen_string_literal: true

class CreateEventAttendees < ActiveRecord::Migration[6.1]
  def change
    create_table :event_attendees do |t|
      t.references :event, foreign_key: true
      t.references :specialist, foreign_key: true
      t.timestamps
    end

    add_index :event_attendees, %i[specialist_id event_id], unique: true
  end
end
