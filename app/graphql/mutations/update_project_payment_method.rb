# The updateCustomer mutation is used to update the users Stripe customer data.
class Mutations::UpdateProjectPaymentMethod < Mutations::BaseMutation
  argument :payment_method, String, required: true
  argument :accept_terms, Boolean, required: false
  argument :exceptional_terms, String, required: false
  argument :invoice_settings, Types::InvoiceSettingsInput, required: false

  field :user, Types::User, null: true
  field :errors, [Types::Error], null: true

  # There must be a User logged in ( not a specialist )
  def authorized?(**args)
    return true if context[:current_user].is_a?(User)
    return false, { errors: [{ code: "notAuthorized" }] }
  end

  def resolve(**args)
    user = context[:current_user]
    user.project_payment_method = args[:payment_method]
    user.exceptional_project_payment_terms = args[:exceptional_terms]

    if args[:invoice_settings]
      user.invoice_name = args[:invoice_settings][:name]
      user.invoice_company_name = args[:invoice_settings][:company_name]
      user.vat_number = args[:invoice_settings][:vat_number]
      user.address = args[:invoice_settings][:address].try(:to_h)
    end

    if user.accepted_project_payment_terms_at.nil? && args[:accept_terms]
      user.accepted_project_payment_terms_at = DateTime.now.utc
    end

    user.sync_to_airtable
    
    if user.save
      {
        user: user
      }
    end
  end
end
