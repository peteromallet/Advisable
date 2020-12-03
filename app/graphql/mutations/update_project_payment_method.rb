# The updateCustomer mutation is used to update the users Stripe customer data.
class Mutations::UpdateProjectPaymentMethod < Mutations::BaseMutation
  argument :payment_method, String, required: false
  argument :accept_terms, Boolean, required: false
  argument :exceptional_terms, String, required: false
  argument :invoice_settings, Types::InvoiceSettingsInput, required: false

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_team_manager!
  end

  def resolve(**args)
    user = current_user
    user.company.project_payment_method = args[:payment_method] if args.has_key?(:payment_method)
    user.exceptional_project_payment_terms = args[:exceptional_terms] if args.has_key?(:exceptional_terms)

    if args.has_key?(:invoice_settings)
      user.company.invoice_name = args[:invoice_settings][:name]
      user.company.invoice_company_name = args[:invoice_settings][:company_name]
      user.company.billing_email = args[:invoice_settings][:billing_email]
      user.company.vat_number = args[:invoice_settings][:vat_number]
      user.company.address = args[:invoice_settings][:address].try(:to_h)

      Stripe::Customer.update(
        user.company.stripe_customer_id, {
          name: user.company.invoice_company_name, # TODO: Store this on Company too
          email: user.account.email
        }
      )
    end

    if user.company.accepted_project_payment_terms_at.nil? && args[:accept_terms]
      user.company.accepted_project_payment_terms_at = Time.zone.now
    end

    store_vat_number(user) if user.company.vat_number_changed?

    user.company.update_payments_setup
    user.save_and_sync_with_responsible!(current_account_id)

    {user: user}
  end

  private

  def store_vat_number(user)
    return if user.company.vat_number.blank?

    Stripe::Customer.create_tax_id(
      user.company.stripe_customer_id,
      {type: "eu_vat", value: user.company.vat_number},
      {idempotency_key: "#{user.company.id}-#{user.company.vat_number}"}
    )
  rescue Stripe::InvalidRequestError
    ApiError.invalid_request(code: "INVALID_VAT", message: "VAT number is invalid")
  end
end
