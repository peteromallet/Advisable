# frozen_string_literal: true

module Mutations
  class SetUnavailableUntil < Mutations::BaseMutation
    class InvalidUnavailabilityDate < StandardError; end

    argument :clear, Boolean, required: false
    argument :date, GraphQL::Types::ISO8601Date, required: false
    argument :unavailable, Boolean, required: false

    field :specialist, Types::SpecialistType, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(date: nil, clear: nil, unavailable: nil)
      if clear
        current_user.update(unavailable_until: nil)
      elsif unavailable
        current_user.update(unavailable_until: "1.1.2050")
      elsif date.future?
        current_user.update(unavailable_until: date)
      else
        raise InvalidUnavailabilityDate
      end

      {specialist: current_user}
    rescue InvalidUnavailabilityDate
      ApiError.invalid_request("INVALID_DATE", "The unavailability date has to be in the future.")
    end
  end
end
