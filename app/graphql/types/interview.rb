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
    field :status, String, null: true
    field :starts_at, GraphQL::Types::ISO8601DateTime, null: true
    field :user, Types::User, null: false
    field :specialist, Types::SpecialistType, null: true
    field :requested_by, Types::Account, null: true

    field :time_zone, String, null: true
    def time_zone
      object.time_zone.presence || object.user&.account&.timezone
    end

    field :participants, [Types::Account], null: false, deprecation_reason: "Use accounts instead"
    field :accounts, [Types::Account], null: false
  end
end
