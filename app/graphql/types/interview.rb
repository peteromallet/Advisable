# frozen_string_literal: true

module Types
  class Interview < Types::BaseType
    def self.authorized?(interview, context)
      policy = InterviewPolicy.new(context[:current_user], interview)
      ApiError.not_authorized("You do not have permission to view this Interview") unless policy.read?
      super
    end

    field :id, ID, null: false, method: :uid
    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs."
    field :availability, [GraphQL::Types::ISO8601DateTime], null: false
    field :status, String, null: true
    field :starts_at, GraphQL::Types::ISO8601DateTime, null: true
    field :application, Types::ApplicationType, null: false
    field :user, Types::User, null: false
    field :specialist, Types::SpecialistType, null: true

    field :time_zone, String, null: true
    def time_zone
      return object.time_zone if object.time_zone.present?

      object.user.try(:time_zone)
    end
  end
end
