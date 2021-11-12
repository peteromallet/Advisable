# frozen_string_literal: true

class AddGoogleCalendarIdToInterview < ActiveRecord::Migration[6.1]
  def change
    add_column :interviews, :google_calendar_id, :string
  end
end
