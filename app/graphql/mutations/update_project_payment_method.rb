# The updateCustomer mutation is used to update the users Stripe customer data.
class Mutations::UpdateProjectPaymentMethod < Mutations::BaseMutation
  argument :payment_method, String, required: false
  argument :accept_terms, Boolean, required: false
  argument :exceptional_terms, String, required: false
  argument :invoice_settings, Types::InvoiceSettingsInput, required: false

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  def authorized?(**args)
    requires_client!
  end

  def resolve(**args)
    user = context[:current_user]
    user.project_payment_method = args[:payment_method] if args.has_key?(:payment_method)
    user.exceptional_project_payment_terms = args[:exceptional_terms] if args.has_key?(:exceptional_terms)

    if args.has_key?(:invoice_settings)
      user.invoice_name = args[:invoice_settings][:name]
      user.invoice_company_name = args[:invoice_settings][:company_name]
      user.billing_email = args[:invoice_settings][:billing_email]
      user.account.vat_number = args[:invoice_settings][:vat_number]
      user.address = args[:invoice_settings][:address].try(:to_h)

      Stripe::Customer.update(
        user.stripe_customer_id, {
          name: user.invoice_company_name,
          email: user.email
        }
      )
    end

    if user.accepted_project_payment_terms_at.nil? && args[:accept_terms]
      user.accepted_project_payment_terms_at = Time.zone.now
    end

    store_vat_number(user) if user.account.vat_number_changed?

    user.update_payments_setup
    user.save_and_sync!
    {user: user}
  end

  private

  def store_vat_number(user)
    return unless user.account.vat_number.present?
    Stripe::Customer.create_tax_id(
      user.stripe_customer_id,
      {
        type: "eu_vat",
        value: user.account.vat_number
      }, {
        idempotency_key: "#{user.uid}-#{user.account.vat_number}"
      }
    )
  rescue Stripe::InvalidRequestError
    ApiError.invalid_request(code: "INVALID_VAT", message: "VAT number is invalid")
  end
end
