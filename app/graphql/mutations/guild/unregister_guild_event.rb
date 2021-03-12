# frozen_string_literal: true

module Mutations
  module Guild
    class UnregisterGuildEvent < Mutations::BaseMutation
      argument :guild_event_id, ID, required: true
      field :guild_event, Types::Guild::EventType, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(guild_event_id:)
        guild_event = ::Guild::Event.find_by_uid!(guild_event_id)
        event_attendee = guild_event.event_attendees.find_by(attendee: current_user)
        event_attendee.destroy

        {guild_event: guild_event.reload}
      end
    end
  end
end
