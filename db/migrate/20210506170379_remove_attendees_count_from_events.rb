# frozen_string_literal: true

class RemoveAttendeesCountFromEvents < ActiveRecord::Migration[6.1]
  def change
    safety_assured do
      remove_column :events, :attendees_count, :integer
    end
  end
end
