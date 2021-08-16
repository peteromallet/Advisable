# frozen_string_literal: true

class GenerateInvoiceJob < ApplicationJob
  TEMPLATE_ID = "81e7c7a3-7989-4f4c-aae8-03d0f0324811"

  queue_as :default

  def perform(company, year, month)
    data = {
      billing_address: "1600 Pennsylvania Ave NW\nWashington, DC 20500\nUnited States",
      client_name: "Secret Client",
      invoice_date: "11/30/2048",
      issue_date: "12/31/2017",
      due_date: "12/31/2018",
      invoice_number: "000001",
      total: 7010,
      deposit: 100.0,
      lineItems: [
        {
          code: "000001",
          description: "Product 1",
          quantity: 6,
          price: 30
        },
        {
          code: "000002",
          description: "Product 2",
          quantity: 3,
          price: 20
        },
        {
          code: "000003",
          description: "Product 3",
          quantity: 7,
          price: 60
        }
      ]
    }

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
