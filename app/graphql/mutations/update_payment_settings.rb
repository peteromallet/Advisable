class Mutations::UpdatePaymentSettings < Mutations::BaseMutation
  description <<~HEREDOC
    Updates the logged in specialists bank account information for payment.
  HEREDOC

  argument :bank_holder_name, String, required: true do
    description "The bank account holder full name or company name."
  end

  argument :bank_holder_address, Types::AddressInput, required: false do
    description  "The bank account holder address."
  end

  argument :bank_currency, String, required: true do
    description "The currency for their bank account."
  end

  argument :vat_number, String, required: false do
    description "Their VAT number."
  end

  field :specialist, Types::SpecialistType, null: true
  field :errors, [Types::Error], null: true

  # There must be a User logged in specialist ( not a User type )
  def authorized?(**args)
    return true if context[:current_user].is_a?(Specialist)
    return false, { errors: [{ code: "notAuthorized" }] }
  end

  def resolve(**args)
    specialist = context[:current_user]
    specialist.update(
      bank_holder_name: args[:bank_holder_name],
      bank_holder_address: args[:bank_holder_address].try(:to_h),
      bank_currency: args[:bank_currency],
      vat_number: args[:vat_number],
    )

    specialist.sync_to_airtable

    { specialist: specialist }
  end
end
