# frozen_string_literal: true

require 'csv'

class GenerateFinanceCsvJob < ApplicationJob
  queue_as :default

  AMOUNT_CURRENCY = "USD"
  SOURCE_CURRENCY = "EUR"
  WISE_PAYMENT_TYPE = "EMAIL"

  def perform
    headers = %w[name recipientEmail paymentReference receiverType amountCurrency amount sourceCurrency targetCurrency type]
    csv_string = CSV.generate(write_headers: true, headers: headers) do |csv|
      # @thomas how should this work exactly? what's the source? paid invoices? completed task line items?
      InvoiceLineItem.find_each do |li|
        specialist = li.invoice.specialist
        csv << [
          specialist.account.name,
          specialist.account.email,
          "🤷‍♂️",
          "PRIVATE",
          AMOUNT_CURRENCY,
          li.amount,
          SOURCE_CURRENCY,
          specialist.bank_currency.presence || SOURCE_CURRENCY,
          WISE_PAYMENT_TYPE
        ]
      end
    end

    # upload this somewhere?
    file = Tempfile.new
    file.write(csv_string)
    file.close
  end
end
