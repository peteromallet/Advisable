class Types::ProjectType < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: false
  field :primary_skill, String, null: true
  field :currency, String, null: true
  field :status, String, null: true
  field :service_type, String, null: true
  field :clientReferralUrl, String, null: true
  field :user, Types::User, null: true
  field :goals, [String], null: true
  field :description, String, null: true
  field :company_description, String, null: true
  field :specialist_description, String, null: true
  field :questions, [String], null: true
  field :required_characteristics, [String], null: true
  field :optional_characteristics, [String], null: true
  field :accepted_terms, Boolean, null: false
  field :deposit_owed, Int, null: true
  field :application_count, Int, null: false
  field :estimated_budget, String, null: true
  field :remote, Boolean, null: true

  field :applications, [Types::ApplicationType, null: true], null: true do
    argument :status, [String], required: false
    # querying for a projects applications requires a special case where the user
    # will face one of three scenrios:
    # 1. The user is not logged in and the client associated to the project
    # has not yet created an account. In this case we want to return an error
    # code of signupRequired. The user email will be included in this error
    # as an extension.
    # 2. The user is not logged in and the client has an account. In this case
    # we need to inform the user to redirect to the login page with an error
    # code of notAuthenticated
    # 3. The user is logged in but does not have access to the project. In this
    # case we dont need to return any error. The autorization logic will return
    # nil for the project.
    # The corresponding frontend code for these cases can be found in
    # /views/Project/index.js
    authorize :can_access_project, error: ->(record, ctx) {
      current_user = ctx[:current_user]
      if !current_user
        user = record.user
        code = "authenticationRequired" 
        extensions = { email: user.try(:email) }
        code = "signupRequired" unless user.try(:has_account?)

        raise GraphQL::ExecutionError.new(code, extensions: extensions)
      end
    }
  end

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  def applications(**args)
    applications = object.applications.order(score: :desc)
    applications = applications.where(status: args[:status]) if args[:status]
    applications
  end

  def application(**args)
    by_airtable = object.applications.find_by_airtable_id(args[:id])
    return by_airtable if by_airtable
    object.applications.find(args[:id])
  end

  def goals
    object.goals || []
  end

  def required_characteristics
    object.required_characteristics || []
  end

  def optional_characteristics
    object.optional_characteristics || []
  end

  def questions
    object.questions || []
  end
end