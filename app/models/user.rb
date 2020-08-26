# A User specifically represents a client looking to hire a freelancer.
# A freelancer account is represented by the Specialist model. Ideally these
# two models will eventually be merged to be different types of users.
class User < ApplicationRecord
  include Uid
  include Account
  include StatusMap
  include Airtable::Syncable
  airtable_class Airtable::ClientContact
  has_many :projects
  has_many :interviews
  has_many :applications, through: :projects
  has_many :consultations
  has_many :searches
  has_many :user_skills
  has_many :skills, through: :user_skills
  has_many :client_calls
  has_one :client_user
  has_one :client, through: :client_user
  belongs_to :sales_person, required: false
  belongs_to :industry, required: false
  belongs_to :country, required: false

  # Guild relations
  has_many :guild_posts, class_name: "Guild::Post"
  has_many :guild_comments, class_name: "Guild::Comment"

  serialize :available_payment_methods, Array

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true
  attribute :address, AddressAttribute::Type.new

  has_one_attached :avatar

  validates :rejection_reason,
            inclusion: { in: %w[cheap_talent not_hiring] }, allow_nil: true

  # talent_quality indicates what qualit of talent the client is looking for.
  # This value is provided when they are applying.
  TALENT_QUALITY_OPTIONS = %w[cheap budget good top world_class]
  validates :talent_quality,
            inclusion: { in: TALENT_QUALITY_OPTIONS }, allow_nil: true

  # number_of_freelancers represents the number of freelancers the client is
  # looking to hire over the next 6 months. This value is provided when they are
  # applying to Advisable.
  NUMBER_OF_FREELANCERS_OPTIONS = %w[0 1-3 4-10 10+]
  validates :number_of_freelancers,
            inclusion: { in: NUMBER_OF_FREELANCERS_OPTIONS }, allow_nil: true

  register_tutorial 'fixedProjects'
  register_tutorial 'flexibleProjects'

  alias_attribute :application_status, :contact_status
  map_status application_status: {
               started: 'Application Started',
               accepted: 'Application Accepted',
               rejected: 'Application Rejected',
               remind: 'Requested Reminder'
             }

  def name
    "#{first_name} #{last_name}"
  end

  def invoice_settings
    {
      name: invoice_name,
      company_name: invoice_company_name,
      billing_email: billing_email,
      vat_number: vat_number,
      address: address
    }
  end

  def stripe_customer_id
    return self[:stripe_customer_id] if self[:stripe_customer_id]
    customer =
      Stripe::Customer.create(
        { email: email, name: company_name, metadata: { user_id: uid } }
      )
    update_columns(stripe_customer_id: customer.id)
    customer.id
  end

  def stripe_customer
    Stripe::Customer.retrieve(
      {
        id: stripe_customer_id,
        expand: %w[invoice_settings.default_payment_method]
      }
    )
  end

  # company name is both a column on the users table and an attribute of the
  # users associated "client" record. We are leaning towards deprecating the
  # user "company_name" column and so this method provide a bridge between
  # the two where it will first check for the client record and then fall back
  # to the company_name column
  def company_name
    return client.name if client.present?
    self[:company_name]
  end

  def payment_method
    stripe_customer.invoice_settings.default_payment_method
  end

  # Updates the payments_setup column to either true or false depending on
  # wether enough payment information has been provided.
  def update_payments_setup
    setup = are_payments_setup
    update(payments_setup: setup)
    setup
  end

  private

  def are_payments_setup
    return false if project_payment_method.nil?
    return false if project_payment_method == 'Card' && payment_method.nil?
    return false if invoice_settings[:name].nil?
    return false if accepted_project_payment_terms_at.nil?
    true
  end

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?
    self.availability = availability.select { |time| time > DateTime.now.utc }
  end
end
