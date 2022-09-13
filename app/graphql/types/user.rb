# frozen_string_literal: true

module Types
  class User < Types::BaseType
    delegate :account, :company, to: :object

    description "Represents a user"
    implements Types::ViewerInterface

    field :id, ID, null: false, method: :uid
    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs."
    field :application_stage, String, null: true, method: :application_status

    field :email, String, null: false do
      authorize :admin?, :user?, :owned_by_company?
    end
    delegate :email, to: :account

    field :is_admin, Boolean, null: false

    def is_admin
      account.admin?
    end

    field :is_team_manager, Boolean, null: true

    def is_team_manager
      account.team_manager?
    end

    field :title, String, null: true
    field :company_name, String, null: true
    def company_name
      object.company.name
    end

    field :time_zone, String, null: true, deprecation_reason: "Use timezone from Account instead"
    def time_zone
      account.timezone
    end

    field :company, Types::CompanyType, null: true
    field :industry, Types::IndustryType, null: true

    # TODO: Teams - frontend should not query for user industry, instead it should
    # query for the users company's industry.
    # It doesn't make sense to copy the industry onto each team member so we
    # return the industry from the associated company
    delegate :industry, to: :company

    field :company_type, String, null: true

    # TODO: Teams - frontend should not query for user company type, instead it
    # should fetch this field from the viewers company
    # For now we override to the associated companies kind
    def company_type
      company.kind
    end

    field :sales_person, Types::SalesPersonType, null: true

    def sales_person
      object&.company&.sales_person
    end

    field :completed_tutorials, [String], null: false do
      authorize :user?, :admin?
    end
    delegate :completed_tutorials, to: :account

    field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :user?
    end

    field :project_payment_method, String, null: true do
      authorize :user?
    end

    field :setup_intent_status, String, null: true do
      authorize :user?
    end

    field :invoice_settings, Types::InvoiceSettingsType, deprecation_reason: "Use invoice_settings field on company type" do
      authorize :user?
    end

    field :payments_setup, Boolean, null: true do
      authorize :user?
    end

    delegate :project_payment_method, :setup_intent_status, :invoice_settings, :payments_setup, to: :company

    field :country, Types::CountryType, null: true

    field :city, String, null: true

    def city
      company.address.city
    end

    field :location, String, null: true

    def location
      return nil if city.nil?

      country = ISO3166::Country.new(company.address.country)
      return city if country.nil?

      "#{company.address.city}, #{country.name}"
    end

    # The customer field returns information from the users stripe customer object.
    field :customer, Types::CustomerType, null: true do
      authorize :user?
    end

    def customer
      company.stripe_customer
    end

    # The paymentMethod field returns the users default payment method from stripe.
    field :payment_method, Types::PaymentMethodType, null: true do
      authorize :user?
    end

    def payment_method
      customer.invoice_settings.default_payment_method
    end

    field :invoices, [Types::InvoiceType], null: true do
      authorize :invoices?
    end

    def invoices
      Stripe::Invoice.list(customer: company.stripe_customer_id).reject do |invoice|
        invoice.status == "draft"
      end
    end

    field :agreement, Types::Agreement, null: true
    def agreement
      requires_current_user!
      return nil if current_user.is_a?(User)

      ::Agreement.latest_for(specialist: current_user, user: object)
    end
  end
end
