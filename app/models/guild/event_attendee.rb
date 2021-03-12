# frozen_string_literal: true

module Guild
  class EventAttendee < ApplicationRecord
    belongs_to :guild_event, class_name: 'Guild::Event', counter_cache: :attendees_count
    belongs_to :attendee, class_name: 'Specialist', foreign_key: 'specialist_id', inverse_of: :event_attendees

    validates :attendee, uniqueness: {
      scope: :guild_event,
      message: "has already registered for this event"
    }
  end
end

# == Schema Information
#
# Table name: guild_event_attendees
#
#  id             :bigint           not null, primary key
#  created_at     :datetime         not null
#  updated_at     :datetime         not null
#  guild_event_id :bigint
#  specialist_id  :bigint
#
# Indexes
#
#  index_guild_event_attendees_on_guild_event_id                    (guild_event_id)
#  index_guild_event_attendees_on_specialist_id                     (specialist_id)
#  index_guild_event_attendees_on_specialist_id_and_guild_event_id  (specialist_id,guild_event_id) UNIQUE
#
# Foreign Keys
#
#  fk_rails_...  (guild_event_id => guild_events.id)
#  fk_rails_...  (specialist_id => specialists.id)
#
