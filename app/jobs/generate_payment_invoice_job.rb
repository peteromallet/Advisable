# frozen_string_literal: true

class GeneratePaymentInvoiceJob < ApplicationJob
  TEMPLATE_ID = "81e7c7a3-7989-4f4c-aae8-03d0f0324811"
  VAT_TEMPLATE_ID = "41FBCD83-E7E5-4CD1-B323-7BD9D16CF981"

  attr_reader :payment

  queue_as :default

  def perform(payment)
    @payment = payment
    generate_pdf
    UserMailer.payment_invoice(payment).deliver_later
  end

  private

  def generate_pdf
    template = payment.company.vat_number&.starts_with?("IE") ? VAT_TEMPLATE_ID : TEMPLATE_ID
    document = Pdfmonkey::Document.generate!(template, pdf_monkey_data)
    if document.status == "success"
      upload_document(document)
    else
      Sentry.capture_message("Something went wrong in payment invoice generation!", extra: {payment:})
    end
  end

  def upload_document(document)
    res = Faraday.get(document.download_url)
    if res.status == 200
      key = "invoices/#{payment.company.name}/#{payment.uid}.pdf"
      tempfile = Tempfile.new(key, binmode: true)
      tempfile.write(res.body)
      tempfile.close
      obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key:)
      obj.upload_file(tempfile.path)
      payment.update(pdf_key: key)
    else
      Sentry.capture_message("Could not download invoice from pdfmonkey!", extra: {payment:})
    end
  end

  def pdf_monkey_data
    {
      billing_address: payment.company.address.inline,
      vat_number: payment.company.vat_number,
      client_name: payment.company.name,
      issue_date: Time.zone.today.strftime("%d.%m.%Y"),
      due_date: Time.zone.today.strftime("%d.%m.%Y"),
      invoice_number: "#{payment.company.id}-#{payment.uid.sub(/^pay_/, '')}",
      total: payment.amount_with_fee / 100.0,
      lineItems: line_items(payment)
    }
  end

  def line_items(payment)
    payment.payment_request.line_items.flat_map do |line_item|
      {
        description: line_item["description"],
        quantity: 1,
        price: line_item["amount"] / 100.0
      }
    end + [{
      description: "Administration Fee",
      quantity: 1,
      price: payment.admin_fee / 100.0
    }]
  end
end
