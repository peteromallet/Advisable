# frozen_string_literal: true

class EventAttendee < ApplicationRecord
  belongs_to :event
  belongs_to :attendee, class_name: 'Specialist', foreign_key: 'specialist_id', inverse_of: :event_attendees

  validates :attendee, uniqueness: {
    scope: :event,
    message: "has already registered for this event"
  }
end

# == Schema Information
#
# Table name: event_attendees
#
#  id            :bigint           not null, primary key
#  created_at    :datetime         not null
#  updated_at    :datetime         not null
#  event_id      :bigint
#  specialist_id :bigint
#
# Indexes
#
#  index_event_attendees_on_event_id                    (event_id)
#  index_event_attendees_on_specialist_id               (specialist_id)
#  index_event_attendees_on_specialist_id_and_event_id  (specialist_id,event_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (event_id => events.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
