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
  field :applications_open, Boolean, null: false
  field :industry, String, null: true
  field :company_type, String, null: true
  
  field :deposit_payment_intent, Types::PaymentIntentType, null: true

  field :applications, [Types::ApplicationType, null: true], null: true do
    argument :status, [String], required: false
  end

  field :application, Types::ApplicationType, null: true do
    argument :id, ID, required: true
  end

  # we are moving the industry data from the project to the client contact
  # record so first check for it there before falling back to the project.
  def industry
    if object.client_contact.try(:industry)
      return object.client_contact.industry.name
    end

    object.industry
  end

  # we are moving the company type data from the project to the client contact
  # record so first check for it there before falling back to the project.
  def company_type
    object.client_contact.try(:company_type) || object.company_type
  end

  # The applications for a project are filtered to only include the top 3
  # candidates plus any applications that have been rejected or featured.
  def applications(status: nil)
    base = object.applications.not_hidden
    applications = (base.rejected.or(base.featured) + base.not_final.top_three).uniq

    if status
      applications = applications.select do |a|
        status.include?(a.status)
      end
    end

    applications
  end

  def deposit_payment_intent 
    if object.deposit_payment_intent_id
      return Stripe::PaymentIntent.retrieve(object.deposit_payment_intent_id)
    end

    intent = Stripe::PaymentIntent.create({
      currency: "usd",
      amount: object.deposit_owed,
      customer: object.user.stripe_customer_id,
      setup_future_usage: "off_session",
      metadata: {
        payment_type: "deposit",
        project: object.uid
      }
    }, {
      idempotency_key: "deposit_#{object.uid}"
    })
    
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