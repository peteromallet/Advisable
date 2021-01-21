# frozen_string_literal: true

class Mutations::UpdateInvoiceSettings < Mutations::BaseMutation
  argument :name, String, "Full Name", required: true
  argument :company_name, String, "Company Name", required: true
  argument :billing_email, String, "Billing Email", required: false
  argument :vat_number, String, "Vat ID", required: false
  argument :address, Types::AddressInput, required: true

  field :user, Types::User, null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(**args)
    company = current_user.company
    company.invoice_name = args[:name]
    company.invoice_company_name = args[:company_name]
    company.billing_email = args[:billing_email] if args.key?(:billing_email)
    company.vat_number = args[:vat_number] if args.key?(:vat_number)
    company.address = args[:address].try(:to_h)

    if company.save
      Stripe::Customer.update(
        company.stripe_customer_id, {
          name: company.invoice_company_name,
          email: company.billing_email || current_user.account.email
        }
      )
    end

    store_vat_number(company) if company.saved_change_to_vat_number?
    company.update_payments_setup

    {user: current_user}
  end

  private

  def store_vat_number(company)
    return if company.vat_number.blank?

    Stripe::Customer.create_tax_id(
      company.stripe_customer_id,
      {type: "eu_vat", value: company.vat_number},
      {idempotency_key: "#{company.id}-#{company.vat_number}"}
    )
  rescue Stripe::InvalidRequestError
    ApiError.invalid_request(code: "INVALID_VAT", message: "VAT number is invalid")
  end
end
