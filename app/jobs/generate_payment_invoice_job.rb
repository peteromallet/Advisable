# frozen_string_literal: true

class GeneratePaymentInvoiceJob < ApplicationJob
  TEMPLATE_ID = "3A631073-955C-4671-8A9D-210BD2F51055"
  VAT_TEMPLATE_ID = "457838B9-AAA8-4754-9BAC-A49485A827C7"

  attr_reader :payment

  queue_as :default

  def perform(payment, notify: false)
    @payment = payment
    generate_pdf
    UserMailer.payment_invoice(payment).deliver_later if notify
  end

  private

  def generate_pdf
    template = payment.company.apply_vat? ? VAT_TEMPLATE_ID : TEMPLATE_ID
    document = Pdfmonkey::Document.generate!(template, pdf_monkey_data)
    puts document.status
    puts document.inspect
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
    due_date = payment&.payment_request&.due_at || payment.created_at
    {
      billing_address: payment.company.address.inline,
      vat_number: payment.company.vat_number,
      client_name: payment.company.name,
      issue_date: payment.created_at.strftime("%d.%m.%Y"),
      due_date: due_date.strftime("%d.%m.%Y"),
      invoice_number: payment.uid.sub(/^pay_/, "").to_s,
      line_items_sum: payment.amount / 100.0,
      admin_fee: payment.admin_fee / 100.0,
      total: payment.total / 100.0,
      vat_amount: payment.vat_amount / 100.0,
      total_with_vat: payment.total_with_vat / 100.0,
      paid: payment.paid?,
      lineItems: line_items(payment)
    }
  end

  def line_items(payment)
    payment.payment_request.line_items.flat_map do |line_item|
      {
        description: line_item["description"],
        price: line_item["amount"] / 100.0
      }
    end
  end
end
