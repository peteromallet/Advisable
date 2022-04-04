# frozen_string_literal: true

class GenerateInvoicePdfJob < ApplicationJob
  TEMPLATE_ID = "81e7c7a3-7989-4f4c-aae8-03d0f0324811"
  VAT_TEMPLATE_ID = "41FBCD83-E7E5-4CD1-B323-7BD9D16CF981"

  attr_reader :invoice

  queue_as :default

  def perform(invoice, notify: false)
    @invoice = invoice

    generate_pdf
    UserMailer.invoice_generated(invoice).deliver_later if notify
  end

  private

  def generate_pdf
    template = invoice.company.apply_vat? ? VAT_TEMPLATE_ID : TEMPLATE_ID
    document = Pdfmonkey::Document.generate!(template, pdf_monkey_data)
    if document.status == "success"
      upload_document(document)
    else
      Sentry.capture_message("Something went wrong in invoice generation!", extra: {invoice:})
    end
  end

  def upload_document(document)
    res = Faraday.get(document.download_url)
    if res.status == 200
      key = "invoices/#{invoice.company.name}/#{invoice.year}-#{invoice.month}.pdf"
      tempfile = Tempfile.new(key, binmode: true)
      tempfile.write(res.body)
      tempfile.close
      obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key:)
      obj.upload_file(tempfile.path)
      invoice.update(key:)
    else
      Sentry.capture_message("Could not download invoice from pdfmonkey!", extra: {invoice:})
    end
  end

  def pdf_monkey_data
    {
      billing_address: invoice.company.address.inline,
      vat_number: invoice.company.vat_number,
      client_name: invoice.company.name,
      issue_date: Time.zone.today.strftime("%d.%m.%Y"),
      due_date: Time.zone.today.strftime("%d.%m.%Y"),
      invoice_number: "#{invoice.company.id}-#{invoice.year}-#{invoice.month}",
      total: invoice.payments.sum(&:total) / 100.0,
      deposit: 0,
      lineItems: line_items(invoice.payments)
    }
  end

  def line_items(payments)
    payments.flat_map do |payment|
      description = payment.specialist.account.name
      {
        description:,
        quantity: 1,
        price: payment.amount / 100.0
      }
    end + [{
      description: "Administration Fee",
      quantity: 1,
      price: payments.sum(:admin_fee) / 100.0
    }]
  end
end