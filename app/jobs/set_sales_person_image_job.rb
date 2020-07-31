require 'open-uri'

class SetSalesPersonImageJob < ApplicationJob
  queue_as :default

  def perform(airtable_id, url)
    sales_person = SalesPerson.find_by_airtable_id(airtable_id)
    filename = File.basename(URI.parse(url).path)
    file = open(url)
    sales_person.image.attach(io: file, filename: filename)
  end
end
