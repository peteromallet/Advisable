# frozen_string_literal: true

module Types
  class ApplicationType < Types::BaseType
    description "Represents a relationship between a freelancer and a client"

    def self.authorized?(application, context)
      policy = ApplicationPolicy.new(context[:current_user], application)
      ApiError.not_authorized("You do not have permission to view this Application") unless policy.read?
      super
    end

    field :id, ID, null: false, method: :uid
    field :invoice_rate, Int, null: true
    field :proposed_at, GraphQL::Types::ISO8601DateTime, null: true, method: :proposal_sent_at
    field :featured, Boolean, null: true
    field :score, Int, null: true
    field :availability, String, null: true
    field :specialist, Types::SpecialistType, null: true
    field :status, String, null: true
    field :comment, String, null: true
    field :introduction, String, null: true
    field :rejection_reason, String, null: true
    field :rejection_feedback, String, null: true
    field :project_type, String, null: true
    field :monthly_limit, Int, null: true
    field :questions, [Types::ApplicationQuestionType, {null: true}], null: true
    field :project, Types::ProjectType, null: false
    field :referral_url, String, null: true
    field :accepts_fee, Boolean, null: true
    field :accepts_terms, Boolean, null: true
    field :interview, Types::Interview, null: true
    field :trial_program, Boolean, null: true
    field :trial_task, Types::TaskType, null: true

    field :proposal_comment, String, null: true do
      authorize :read?
    end

    field :previous_projects, [Types::PreviousProject], null: false do
      argument :fallback, Boolean, required: false
    end

    # When querying for an applications previous_projects, we can pass a 'fallback'
    # argument which when true will fall back to returning all of the specialists
    # previous proejcts if there are none specifically related to the application
    # through references. This argument defaults to true.
    def previous_projects(fallback: true)
      projects = object.previous_projects
      projects = object.specialist.previous_projects.validated if fallback && projects.empty?
      projects
    end

    field :tasks, [Types::TaskType], null: true do
      authorize :read?
    end

    def tasks
      object.tasks.active
    end

    field :applied_at, String, null: true

    def applied_at
      object.applied_at.try(:iso8601)
    end

    field :hidden, Boolean, null: true

    def hidden
      object.hidden || false
    end
  end
end
