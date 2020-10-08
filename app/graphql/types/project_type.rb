class Types::ProjectType < Types::BaseType
  # There are a lot of random project status's from old Airtable data that we
  # need to maintain support for. However, we want to move towards more
  # stable and structured status and follow the convention of returning statuses
  # in upper case. This map simply maps statuses from the project model status
  # to their graphql value to allow us to move over one by one.
  STATUS_VALUES = { draft: 'DRAFT', pending_review: 'PENDING_REVIEW' }

  field :id, ID, null: false

  def id
    object.uid
  end

  field :airtable_id, String, null: true
  field :name, String, null: false

  def name
    object.name || object.primary_skill&.name
  end

  field :primary_skill, Types::Skill, null: true
  # Wether or not we are actively searching for candidates
  field :sourcing, Boolean, null: true

  # We are moving away from storing primary skill in the primary_skill text
  # column. First we check the project_skills association and if one isn't
  # set then we fall back to finding by the primary_skill text column.
  def primary_skill
    skill = object.project_skills.where(primary: true).first.try(:skill)
    return skill if skill.present?
    Skill.find_by_name(object[:primary_skill])
  end

  field :sales_person, Types::SalesPersonType, null: true

  def sales_person
    object.sales_person || object.user&.sales_person
  end

  field :skills, [Types::Skill], null: true

  def skills
    object.skills.order(created_at: :desc)
  end

  field :currency, String, null: true

  field :status, String, null: true

  # Return the value from the STATUS_MAP or just fallback to the original value.
  def status
    STATUS_VALUES[object.status] || object.status
  end

  field :service_type, String, null: true
  field :client_referral_url, String, null: true
  field :user, Types::User, null: true
  field :goals, [String], null: true
  field :description, String, null: true
  field :company_description, String, null: true
  field :specialist_description, String, null: true
  field :questions, [String], null: true
  field :accepted_terms, Boolean, null: false
  field :deposit_owed, Int, null: true
  field :application_count, Int, null: false
  field :candidate_count, Int, null: false
  field :proposed_count, Int, null: false
  field :hired_count, Int, null: false
  field :estimated_budget, String, null: true
  field :remote, Boolean, null: true
  field :applications_open, Boolean, null: false
  field :industry, String, null: true
  field :company_type, String, null: true
  field :created_at, GraphQL::Types::ISO8601DateTime, null: false

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

  field :deposit_payment_intent, Types::PaymentIntentType, null: true

  # Returns the current 'candidates' for the project. This excludes any
  # applications in a working or finished working state.
  field :applications, [Types::ApplicationType, null: true], null: true do
    argument :status, [String], required: false
  end

  def applications(status: nil)
    applications = object.candidates

    if status
      applications = applications.select { |a| status.include?(a.status) }
    end

    applications
  end

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  field :characteristics, [String], null: true
  field :required_characteristics, [String], null: true
  field :optional_characteristics, [String], null: true

  def deposit_payment_intent
    if object.deposit_payment_intent_id
      return Stripe::PaymentIntent.retrieve(object.deposit_payment_intent_id)
    end

    intent =
      Stripe::PaymentIntent.create(
        {
          currency: 'usd',
          amount: object.deposit_owed,
          customer: object.user.stripe_customer_id,
          setup_future_usage: 'off_session',
          metadata: { payment_type: 'deposit', project: object.uid }
        },
        { idempotency_key: "deposit_#{object.uid}" }
      )

    object.update_columns(deposit_payment_intent_id: intent.id)
    intent
  end

  def application_count
    applications.count
  end

  def application(**args)
    by_airtable = object.applications.find_by_uid_or_airtable_id(args[:id])
    return by_airtable if by_airtable
    object.applications.find(args[:id])
  end

  def goals
    object.goals || []
  end

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
    unless current_user.present?
      if object.user.account.has_password?
        ApiError.not_authenticated
      else
        ApiError.invalid_request(code: "SIGNUP_REQUIRED", message: "Signup is required", extensions: {
          url: "/signup/#{object.user.uid}",
          email: object.user.email
        })
      end
    end

    policy = ProjectPolicy.new(current_user, object)
    policy.can_access_project?
  end
end
