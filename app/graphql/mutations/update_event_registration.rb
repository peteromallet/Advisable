# frozen_string_literal: true

module Mutations
  class UpdateEventRegistration < Mutations::BaseMutation
    class RegistrationActionType < Types::BaseEnum
      value "REGISTER"
      value "UNREGISTER"
    end

    argument :action_type, RegistrationActionType, required: true
    argument :event_id, ID, required: true
    field :event, Types::EventType, null: true

    def authorized?(**_args)
      requires_accepted_specialist!
    end

    def resolve(event_id:, action_type:)
      event = ::Event.find_by!(uid: event_id)

      case action_type
      when "REGISTER"
        event.event_attendees.find_or_create_by!(attendee: current_user)
      when "UNREGISTER"
        event_attendee = event.event_attendees.find_by!(attendee: current_user)
        event_attendee.destroy
      end

      {event: event.reload}
    end
  end
end
