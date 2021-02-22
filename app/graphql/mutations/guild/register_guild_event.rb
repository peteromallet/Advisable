# frozen_string_literal: true

module Mutations
  module Guild
    class RegisterGuildEvent < Mutations::BaseMutation
      argument :guild_event_id, ID, required: true
      field :guild_event, Types::Guild::EventType, null: true

      def authorized?(**_args)
        requires_guild_user!
      end

      def resolve(guild_event_id:)
        guild_event = ::Guild::Event.find(guild_event_id)
        guild_event.event_attendees.create!(attendee: current_user)

        {guild_event: guild_event.reload}
      end
    end
  end
end
