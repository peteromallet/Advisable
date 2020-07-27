class Types::ProjectType < Types::BaseType
  field :id, ID, null: false

  def id
    object.uid
  end

  field :airtable_id, String, null: true
  field :name, String, null: false
  field :primary_skill, Types::Skill, null: true

  # We are moving away from storing primary skill in the primary_skill text
  # column.
  def primary_skill
    object.project_skills.where(primary: true).first.try(:skill)
  end

  field :skills, [Types::Skill], null: true
  field :currency, String, null: true
  field :status, String, null: true
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

  # we are moving the industry data from the project to the client contact
  # record so first check for it there before falling back to the project.
  def industry
    return object.user.industry.name if object.user.try(:industry)

    object.industry
  end

  # we are moving the company type data from the project to the client contact
  # record so first check for it there before falling back to the project.
  def company_type
    object.user.try(:company_type) || object.company_type
  end

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
    by_airtable = object.applications.find_by_airtable_id(args[:id])
    return by_airtable if by_airtable
    object.applications.find(args[:id])
  end

  def goals
    object.goals || []
  end

  def questions
    object.questions || []
  end
end
