require 'open-uri'

class SetSalesPersonImageJob < ApplicationJob
  queue_as :default

  def perform(id, url)
    sales_person = SalesPerson.find_by_uid_or_airtable_id(id)
    return if url.blank? || sales_person.blank?

    filename = File.basename(URI.parse(url).path)
    file = open(url)
    sales_person.image.attach(io: file, filename: filename)
  rescue URI::BadURIError, URI::InvalidURIError => e
    Raven.capture_exception(e, level: "warning")
  end
end
