class User < ApplicationRecord
  include UID
  include Account
  include Airtable::Syncable
  airtable_class Airtable::ClientContact

  has_many :projects
  has_many :interviews
  has_many :applications, through: :projects
  has_one :client_user
  has_one :client, through: :client_user
  belongs_to :country, required: false

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true

  register_tutorial "fixedProjects"
  register_tutorial "flexibleProjects"

  def name
    "#{first_name} #{last_name}"
  end

  def stripe_customer_id
    return self[:stripe_customer_id] if self[:stripe_customer_id]
    customer = Stripe::Customer.create({
      email: email,
      name: company_name,
      metadata: {
        user_id: uid,
      }
    })
    update_columns(stripe_customer_id: customer.id)
    customer.id
  end

  def stripe_customer
    Stripe::Customer.retrieve({
      id: stripe_customer_id,
      expand: ['invoice_settings.default_payment_method']
    })
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

  private

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?
    self.availability = availability.select do |time|
      time > DateTime.now.utc
    end
  end
end
