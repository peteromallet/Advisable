# frozen_string_literal: true

class GenerateInvoiceJob < ApplicationJob
  TEMPLATE_ID = "81e7c7a3-7989-4f4c-aae8-03d0f0324811"

  queue_as :default

  def perform(company, year, month)
    date = Date.parse("1.#{month}.#{year}")
    payments = company.payments.with_status("succeeded").where(created_at: date.all_month)

    data = {
      billing_address: company.address.inline,
      client_name: company.name,
      issue_date: "12/31/2017",
      due_date: "12/31/2018",
      invoice_number: "#{company.id}-#{year}-#{month}",
      total: payments.sum(&:amount_with_fee),
      deposit: payments.sum(:deposit)
    }

    line_items = payments.flat_map do |payment|
      description = payment.specialist.account.name
      description += " - #{payment.task.name}" if payment.task&.name&.present?
      {
        description: description,
        quantity: 1,
        price: payment.amount
      }
    end
    line_items << {
      description: "Administration Fee",
      quantity: 1,
      price: payments.sum(:admin_fee)
    }
    data[:lineItems] = line_items

    document = Pdfmonkey::Document.generate!(TEMPLATE_ID, data)

    if document.status == "success"
      res = Faraday.get(document.download_url)

      if res.status == 200
        path = "invoices/#{company.name}/#{year}-#{month}.pdf"
        tempfile = Tempfile.new(path, binmode: true)
        tempfile.write(res.body)
        tempfile.close
        obj = Aws::S3::Object.new(bucket_name: ENV["AWS_S3_BUCKET"], key: path)
        obj.upload_file(tempfile.path)

        # DEBUG 👇️
        puts("Invoice: #{obj.presigned_url(:get, expires_in: 3600)}")
        # DEBUG 👆️
        return obj
      end
    end
    Sentry.capture_message("Something went wrong in invoice generation!", extra: {company: company, year: year, month: month})
  end
end
