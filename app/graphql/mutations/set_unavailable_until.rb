# frozen_string_literal: true

module Mutations
  class SetUnavailableUntil < Mutations::BaseMutation
    argument :clear, Boolean, required: false
    argument :date, GraphQL::Types::ISO8601Date, required: false

    field :specialist, Types::SpecialistType, null: true

    def authorized?(**_args)
      requires_specialist!
    end

    def resolve(date: nil, clear: nil)
      if clear
        current_user.update(unavailable_until: nil)
        {specialist: current_user}
      elsif date.future?
        current_user.update(unavailable_until: date)
        {specialist: current_user}
      else
        ApiError.invalid_request("INVALID_DATE", "The unavailability date has to be in the future.")
      end
    end
  end
end
