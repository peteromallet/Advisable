# frozen_string_literal: true

module Mutations
  class FinalizeInvoice < Mutations::BaseMutation
    description "Finalizes customer's invoice by creating admin fee, applying deposit, and marking invoice as finalized in Stripe."

    argument :id, ID, required: true

    field :invoice, Types::InvoiceType, null: true

    def authorized?(id:)
      requires_current_user!
      invoice = Invoice.find(id)
      policy = InvoicePolicy.new(current_user, invoice)
      return true if policy.finalize?

      ApiError.not_authorized("You do not have permission to finalize this invoice")
    end

    def resolve(id:)
      invoice = Invoice.find(id)
      invoice.create_admin_fee!
      invoice.apply_deposit!
      response = Stripe::Invoice.send_invoice(invoice.stripe_invoice_id)
      invoice.update!(status: response.status)
      {invoice: invoice}
    end
  end
end
