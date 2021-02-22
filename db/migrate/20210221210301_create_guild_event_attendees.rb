# frozen_string_literal: true

class CreateGuildEventAttendees < ActiveRecord::Migration[6.1]
  def change
    create_table :guild_event_attendees, id: :uuid do |t|
      t.references :guild_event, foreign_key: true, type: :uuid
      t.references :specialist, foreign_key: true
      t.timestamps
    end

    add_index :guild_event_attendees, %i[specialist_id guild_event_id], unique: true
  end
end
