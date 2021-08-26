# frozen_string_literal: true

module Mutations
  class UpdateInvoiceSettings < Mutations::BaseMutation
    description "Update invoice settings"

    argument :address, Types::AddressInput, required: false
    argument :billing_email, String, "Billing Email", required: false
    argument :company_name, String, "Company Name", required: false
    argument :name, String, "Full Name", required: false
    argument :payment_method, String, required: false
    argument :vat_number, String, "Vat ID", required: false

    field :user, Types::User, null: true

    def authorized?(**_args)
      requires_team_manager!
    end

    def resolve(**args)
      current_company.invoice_name = args[:name] if args.key?(:name)
      current_company.invoice_company_name = args[:company_name] if args.key?(:company_name)
      current_company.billing_email = args[:billing_email] if args.key?(:billing_email)
      current_company.vat_number = args[:vat_number] if args.key?(:vat_number)
      current_company.address = args[:address].try(:to_h) if args.key?(:address)
      current_company.project_payment_method = args[:payment_method] if args.key?(:payment_method)

      if current_company.save
        Stripe::Customer.update(
          current_company.stripe_customer_id, {
            name: current_company.invoice_company_name,
            email: current_company.billing_email || current_user.account.email
          }
        )

        current_user.bg_sync_to_airtable

        sync_vat_number_to_stripe if current_company.saved_change_to_vat_number?
        current_company.update_payments_setup
      end

      {user: current_user}
    end

    private

    def sync_vat_number_to_stripe
      return if current_company.vat_number.blank?

      Stripe::Customer.create_tax_id(
        current_company.stripe_customer_id,
        {type: "eu_vat", value: current_company.vat_number},
        {idempotency_key: "#{current_company.id}-#{current_company.vat_number}"}
      )
    rescue Stripe::InvalidRequestError
      ApiError.invalid_request("INVALID_VAT", "VAT number is invalid")
    end
  end
end
