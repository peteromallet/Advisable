# frozen_string_literal: true

module Types
  class User < Types::BaseType
    description "Represents a user"
    implements Types::AccountInterface
    delegate :account, :company, to: :object
    field :airtable_id, String, null: true, deprecation_reason: "We're moving away from Airtable. Please stop using Airtable IDs."
    field :application_stage, String, null: true, method: :application_status

    field :email, String, null: false do
      authorize :admin?, :user?, :candidate_for_user_project?, :owned_by_company?
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

    field :time_zone, String, null: true
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
      authorize :user?
    end

    def completed_tutorials
      object.account.completed_tutorials
    end

    field :has_completed_tutorial, Boolean, null: false do
      argument :tutorial, String, required: true
      authorize :user?
    end

    def has_completed_tutorial(tutorial:)
      object.account.completed_tutorial?(tutorial)
    end

    field :created_at, GraphQL::Types::ISO8601DateTime, null: true do
      authorize :user?
    end

    field :project_payment_method, String, null: true do
      authorize :user?
    end

    field :setup_intent_status, String, null: true do
      authorize :user?
    end

    field :invoice_settings, Types::InvoiceSettingsType, null: true do
      authorize :user?
    end

    field :payments_setup, Boolean, null: true do
      authorize :user?
    end

    delegate :project_payment_method, :setup_intent_status, :invoice_settings, :payments_setup, to: :company

    field :country, Types::CountryType, null: true

    field :interviews, [Types::Interview], null: true do
      argument :status, String, required: false
      authorize :user?
    end

    def interviews(status: nil)
      interviews = object.interviews
      interviews = interviews.where(status: status) if status
      interviews
    end

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

    field :id, ID, null: false, method: :uid

    field :talk_signature, String, null: false do
      authorize :user?
    end

    def talk_signature
      user_id = context[:current_user].uid
      OpenSSL::HMAC.hexdigest("SHA256", ENV["TALKJS_SECRET"], user_id)
    end

    field :projects, [Types::ProjectType], null: true, deprecation_reason: "Moved to Company" do
      authorize :user?, :admin?
    end
    # Exclude any projects where the sales status is 'Lost'. We need to use an
    # or statement here otherwise SQL will also exclude records where sales_status
    # is null.
    def projects
      company.projects.where.not(sales_status: "Lost").or(
        company.projects.where(sales_status: nil)
      ).order(created_at: :desc)
    end

    field :availability, [GraphQL::Types::ISO8601DateTime], null: false do
      argument :exclude_conflicts,
               Boolean,
               required: false,
               description:
                 "Exclude any times that conflict with scheduled interviews"
    end

    def availability(exclude_conflicts: false)
      times = object.availability || []
      if exclude_conflicts
        interviews = object.interviews.scheduled.map(&:starts_at)
        times.reject! { |t| interviews.include?(t) }
      end
      times
    end

    field :applications, [Types::ApplicationType], null: true do
      authorize :user?
      argument :status, [String], required: false
    end

    def applications(status: nil)
      records = company.applications
      records = records.where(status: status) if status
      records
    end

    # The client application is another representation of a user that is
    # specifically used during the client signup flow.
    field :client_application, Types::ClientApplicationType, null: true do
      authorize :user?
    end
    def client_application
      object
    end

    field :avatar, String, null: true
    def avatar
      Rails.cache.fetch("account_avatar_#{object.account_id}", expires_in: 1.day) do
        object.resized_avatar_url
      end
    end
  end
end
