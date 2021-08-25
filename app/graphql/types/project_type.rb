# frozen_string_literal: true

module Types
  class ProjectType < Types::BaseType
    description "Fields representing Project model"

    field :id, ID, null: false, method: :uid
    field :name, String, null: false

    def name
      object.name || object.primary_skill&.name
    end

    field :primary_skill, Types::Skill, null: true
    # Whether or not we are actively searching for candidates
    field :sourcing, Boolean, null: true

    field :sales_person, Types::SalesPersonType, null: true

    def sales_person
      object.user&.company&.sales_person
    end

    field :skills, [Types::Skill], null: true

    def skills
      object.skills.order(created_at: :desc)
    end

    field :accepted_terms, Boolean, null: false
    field :client_referral_url, String, null: true
    field :company_description, String, null: true
    field :currency, String, null: true
    field :candidate_count, Int, null: false do
      authorize :read?
    end
    field :description, String, null: true
    field :proposed_count, Int, null: false do
      authorize :read?
    end
    field :hired_count, Int, null: false do
      authorize :read?
    end
    field :applications_open, Boolean, null: false
    field :company_type, String, null: true
    field :created_at, GraphQL::Types::ISO8601DateTime, null: false
    field :estimated_budget, String, null: true
    field :industry, String, null: true
    field :remote, Boolean, null: true
    field :service_type, String, null: true
    field :specialist_description, String, null: true
    field :status, String, null: true
    field :user, Types::User, null: true

    field :published_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :read?
    end

    field :is_owner, Boolean, null: true

    def is_owner
      current_user == object.user
    end

    field :industry_experience_importance, Int, null: true do
      description <<~HEREDOC
        How important indusry experience is for this job. Range from 0 - 3.
      HEREDOC
    end

    field :location_importance, Int, null: true do
      description <<~HEREDOC
        How important freelancer location is for this job. Range from 0 - 3.
      HEREDOC
    end

    # How likely the client is to hire a good match. This is defined when they are
    # first creating the project.
    field :likely_to_hire, Int, null: true

    # Returns the current 'candidates' for the project. This excludes any
    # applications in a working or finished working state.
    field :applications, [Types::ApplicationType, {null: true}], null: true do
      authorize :read?
      argument :status, [String], required: false
    end

    def applications(status: nil)
      applications = object.candidates

      applications = applications.select { |a| status.include?(a.status) } if status

      applications
    end

    field :characteristics, [String], null: true
    field :optional_characteristics, [String], null: true
    field :required_characteristics, [String], null: true

    field :application_count, Int, null: false do
      authorize :read?
    end

    def application_count
      applications.size
    end

    field :goals, [String], null: true

    def goals
      object.goals || []
    end

    field :questions, [String], null: true

    def questions
      object.questions || []
    end

    # When a user trys to view a project, this field will be used to determine if
    # they have access to view the project. If there is no user logged in we do
    # one of two things:
    # 1. If the project user has set a password, we raise a not authenticated
    # error and redirect to login.
    # 2. If the project user has no password, we raise a SIGNUP_REQUIRED error
    # to redirect the user to set their password. We include the email so the
    # frontend can prefill the email field.
    # TODO: Including the email is a security concern and we should update this
    # shortly to use an token based confirmation flow instead.
    field :viewer_can_access, Boolean, null: true

    def viewer_can_access
      if current_user.blank?
        if object.user.account.has_password?
          ApiError.not_authenticated
        else
          ApiError.invalid_request("SIGNUP_REQUIRED", "Signup is required", extensions: {url: "/signup/#{object.user.uid}", email: object.user.account.email})
        end
      end

      policy = ProjectPolicy.new(current_user, object)
      policy.can_access_project?
    end

    field :deposit, Types::DepositType, null: true do
      authorize :read?
    end

    # In cases where there is no deposit we just return nil. Otherwise we pass
    # the project object to the DepositType.
    def deposit
      return if object.deposit.blank? || object.deposit.zero?

      object
    end
  end
end
