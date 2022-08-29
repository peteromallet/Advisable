# frozen_string_literal: true

module Airtable
  class SalesPerson < Airtable::Base
    self.table_name = "Salespeople"
    self.base_key = ENV.fetch("AIRTABLE_DATABASE_KEY", nil)
    sync_with ::SalesPerson

    private

    def sync_image(sales_person)
      return if self["Image"].blank?

      attached_image = sales_person.image
      filename = attached_image.attached? ? attached_image.filename.to_s : nil
      airtable_filename = self["Image"].try(:first).try(:[], "filename")
      return if filename == airtable_filename

      AttachImageJob.perform_later(sales_person, self["Image"].first["url"])
    end
  end
end
