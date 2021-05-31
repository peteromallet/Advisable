# frozen_string_literal: true

module Mutations
  class FinalizeInvoice < Mutations::BaseMutation
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
      response = Stripe::Invoice.finalize_invoice(invoice.stripe_invoice_id, auto_advance: false)
      invoice.update!(status: response.status)
      {invoice: invoice}
    end
  end
end
