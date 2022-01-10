# frozen_string_literal: true

module Mutations
  class RequestIntroduction < Mutations::BaseMutation
    argument :application, ID, required: true
    argument :availability, [GraphQL::Types::ISO8601DateTime], required: false
    argument :time_zone, String, required: false

    field :interview, Types::Interview, null: true
    field :application, Types::ApplicationType, null: true

    def authorized?(**args)
      requires_current_user!
      application = Application.find_by!(uid: args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.write?

      ApiError.not_authorized("You do not have access to this")
    end

    def resolve(**args)
      application = Application.find_by!(uid: args[:application])

      current_user.update(availability: args[:availability]) if args[:availability]

      interview = create_interview(application, args[:time_zone])
      current_account_responsible_for do
        application.update(status: "Application Accepted")
      end
      application.project.update_sourcing

      {interview:, application:}
    end

    private

    def create_interview(application, time_zone)
      application.create_interview(
        user: current_user,
        time_zone: time_zone || current_user.time_zone,
        status: "Call Requested",
        call_requested_at: Time.zone.now
      )
    end
  end
end
