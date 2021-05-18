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
      application = Application.find_by_uid_or_airtable_id!(args[:application])
      policy = ApplicationPolicy.new(current_user, application)
      return true if policy.write?

      ApiError.not_authorized('You do not have access to this')
    end

    def resolve(**args)
      application = Application.find_by_uid_or_airtable_id!(args[:application])

      current_user.update(availability: args[:availability]) if args[:availability]

      interview = create_interview(application, args[:time_zone])
      update_application_status(application)
      application.project.update_sourcing

      {interview: interview, application: application}
    end

    private

    def create_interview(application, time_zone)
      application.create_interview(
        user: current_user,
        time_zone: time_zone || current_user.time_zone,
        status: 'Call Requested',
        call_requested_at: Time.zone.now
      )
    end

    def update_application_status(application)
      application.update(status: 'Application Accepted')
      application.sync_to_airtable
    end
  end
end
