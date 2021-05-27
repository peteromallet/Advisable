# frozen_string_literal: true

require 'csv'

class GenerateFinanceCsvJob < ApplicationJob
  HEADERS = %w[name recipientEmail paymentReference receiverType amountGross amountNet sourcingFee amountCurrency sourceCurrency targetCurrency IBAN type].freeze

  queue_as :default

  SOURCE_CURRENCY = "EUR"

  def perform
    exported_invoices = []

    csv_string = CSV.generate(write_headers: true, headers: HEADERS) do |csv|
      Invoice.draft.each do |invoice|
        specialist = invoice.specialist

        type = email = iban = nil
        if specialist.iban.present?
          iban = specialist.iban
        else
          type = "EMAIL"
          email = specialist.account.email
        end

        amount_currency = "USD" # TODO: Apparently not always
        amount_gross = invoice.line_items.sum(:amount)
        amount_net = amount_gross * (1 - specialist.sourcing_fee_percentage)
        # TODO: Do currency conversion on amount

        exported_invoices << invoice.id
        csv << [
          specialist.account.name,
          email,
          "invoice##{invoice.id}",
          "PRIVATE",
          amount_gross,
          amount_net,
          specialist.sourcing_fee_percentage * 100,
          amount_currency,
          SOURCE_CURRENCY,
          specialist.bank_currency.presence || SOURCE_CURRENCY,
          iban,
          type
        ]
      end
    end

    # TODO: email this
    file = Tempfile.new
    file.write(csv_string)
    file.close

    Invoice.where(id: exported_invoices).update_all(status: :exported, exported_at: Time.zone.now) # rubocop:disable Rails/SkipsModelValidations
  end
end
