# frozen_string_literal: true

class AddGoogleCalendarIdAndStatusToEvents < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      change_table :events, bulk: true do |t|
        t.string :google_calendar_id
        t.string :status
      end
    end
  end
end
