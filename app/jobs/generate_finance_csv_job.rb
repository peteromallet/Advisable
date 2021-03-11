# frozen_string_literal: true

require 'csv'

class GenerateFinanceCsvJob < ApplicationJob
  queue_as :default

  SOURCE_CURRENCY = "EUR"

  def perform
    headers = %w[name recipientEmail paymentReference receiverType amountCurrency amount sourceCurrency targetCurrency IBAN type]
    csv_string = CSV.generate(write_headers: true, headers: headers) do |csv|
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
        amount = Invoice.draft.first.line_items.sum(:amount)
        # TODO: Remove advisable fee
        # TODO: Do currency conversion on amount

        csv << [
          specialist.account.name,
          email,
          "invoice##{invoice.id}",
          "PRIVATE",
          amount_currency,
          amount,
          SOURCE_CURRENCY,
          specialist.bank_currency.presence || SOURCE_CURRENCY,
          iban,
          type
        ]
      end
    end

    # upload this somewhere?
    file = Tempfile.new
    file.write(csv_string)
    file.close
  end
end
