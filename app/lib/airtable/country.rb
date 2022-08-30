# frozen_string_literal: true

module Airtable
  class Country < Airtable::Base
    self.table_name = "Countries"
    has_many :specialists, class: "Specialist", column: "Specialists"
    sync_with ::Country
  end
end
