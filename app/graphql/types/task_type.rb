# frozen_string_literal: true

module Types
  class TaskType < Types::BaseType
    def self.authorized?(task, context)
      policy = TaskPolicy.new(context[:current_user], task)
      ApiError.not_authorized("You do not have permission to view this Task") unless policy.read?
      super
    end

    field :id, ID, null: false
    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs."
    field :stage, String, null: true
    field :name, String, null: true
    field :repeat, String, null: true
    field :estimate, Int, null: true
    field :trial, Boolean, null: true
    field :final_cost, Int, null: true
    field :flexible_estimate, Int, null: true
    field :estimate_type, String, null: true
    field :due_date, GraphQL::Types::ISO8601Date, null: true
    field :description, String, null: true
    field :application, Types::ApplicationType, null: false
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false

    def id
      object.uid
    end
  end
end
