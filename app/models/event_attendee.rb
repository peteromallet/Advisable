# frozen_string_literal: true

class EventAttendee < ApplicationRecord
  belongs_to :event
  belongs_to :attendee, class_name: "Specialist", foreign_key: "specialist_id", inverse_of: :event_attendees

  validates :attendee, uniqueness: {
    scope: :event,
    message: "has already registered for this event"
  }
end

# == Schema Information
#
# Table name: event_attendees
#
#  id            :integer          not null, primary key
#  event_id      :integer
#  specialist_id :integer
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#
# Indexes
#
#  index_event_attendees_on_event_id                    (event_id)
#  index_event_attendees_on_specialist_id               (specialist_id)
#  index_event_attendees_on_specialist_id_and_event_id  (specialist_id,event_id) UNIQUE
#
