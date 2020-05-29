class Types::User < Types::BaseType
  field :id, ID, null: false
  field :airtable_id, String, null: false
  field :name, String, null: true
  field :first_name, String, null: true
  field :last_name, String, null: true
  field :title, String, null: true
  field :company_name, String, null: true
  field :time_zone, String, null: true
  field :projects, [Types::ProjectType], null: true
  field :confirmed, Boolean, null: false
  field :availability, [GraphQL::Types::ISO8601DateTime], null: false do
    argument :exclude_conflicts,
             Boolean,
             required: false,
             description:
               'Exclude any times that conflict with scheduled interviews'
  end

  field :bank_transfers_enabled, Boolean, null: true
  field :industry, Types::IndustryType, null: true
  field :company_type, String, null: true

  field :talk_signature, String, null: false do
    authorize :is_user
  end

  field :completed_tutorials, [String], null: false do
    authorize :is_user
  end

  field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
    authorize :is_user
  end

  field :email, String, null: false do
    authorize :is_admin, :is_user, :is_candidate_for_user_project
  end

  field :applications, [Types::ApplicationType], null: true do
    authorize :is_user
    argument :status, [String], required: false
  end

  field :project_payment_method, String, null: true do
    authorize :is_user
  end

  field :invoice_settings, Types::InvoiceSettingsType, null: true do
    authorize :is_user
  end

  field :payments_setup, Boolean, null: true do
    authorize :is_user
  end

  field :country, Types::CountryType, null: true

  field :setup_intent_status, String, null: true do
    authorize :is_user
  end

  field :interviews, [Types::Interview], null: true do
    authorize :is_user
  end

  # The customer field returns information from the users stripe customer
  # object.
  field :customer, Types::CustomerType, null: true do
    authorize :is_user
  end

  def customer
    Stripe::Customer.retrieve(object.stripe_customer_id)
  end

  # The paymentMethod field returns the users default payment method from
  # stripe.
  field :payment_method, Types::PaymentMethodType, null: true do
    authorize :is_user
  end

  def payment_method
    object.stripe_customer.invoice_settings.default_payment_method
  end

  def id
    object.uid
  end

  def talk_signature
    user_id = context[:current_user].uid
    OpenSSL::HMAC.hexdigest('SHA256', ENV['TALKJS_SECRET'], user_id)
  end

  # Exclude any projects where the sales status is 'Lost'. We need to use an
  # or statement here otherwise SQL will also exclude records where sales_status
  # is null.
  def projects
    object.projects.where.not(sales_status: 'Lost').or(
      object.projects.where(sales_status: nil)
    )
  end

  def availability(exclude_conflicts: false)
    times = object.availability || []
    if exclude_conflicts
      interviews = object.interviews.scheduled.map(&:starts_at)
      times.reject! { |t| interviews.include?(t) }
    end
    times
  end

  #
  def applications(status:)
    records = object.applications
    records = records.where(status: status) if status
    records
  end
end
