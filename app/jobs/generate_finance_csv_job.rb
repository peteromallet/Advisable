# frozen_string_literal: true

require "csv"

class GenerateFinanceCsvJob < ApplicationJob
  HEADERS = %w[name recipientEmail paymentReference receiverType amountGross amountNet sourcingFee amountCurrency sourceCurrency targetCurrency IBAN type].freeze

  queue_as :default

  SOURCE_CURRENCY = "EUR"

  def perform(recipient_email)
    csv_string = CSV.generate(write_headers: true, headers: HEADERS) do |csv|
      Payout.unprocessed.order(:specialist_id, :created_at).each do |payout|
        specialist = payout.specialist

        type = email = iban = nil
        if specialist.iban.present?
          iban = specialist.iban
        else
          type = "EMAIL"
          email = specialist.account.email
        end

        amount_currency = "USD" # TODO: Apparently not always

        csv << [
          specialist.account.name,
          email,
          "payout##{payout.uid}",
          "PRIVATE",
          convert_from_cents(payout.amount),
          convert_from_cents(payout.amount_without_fee),
          convert_from_cents(payout.sourcing_fee),
          amount_currency,
          SOURCE_CURRENCY,
          specialist.bank_currency.presence || SOURCE_CURRENCY,
          iban,
          type
        ]
      end
    end

    StaffMailer.finance_csv(recipient_email, csv_string).deliver_later
  end

  private

  def convert_from_cents(amount)
    (amount / 100.0).round
  end
end
