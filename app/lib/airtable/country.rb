# frozen_string_literal: true
class Airtable::Country < Airtable::Base
  self.table_name = "Countries"

  has_many :specialists, class: "Specialist", column: "Specialists"

  # Tells which active record model to sync data with.
  sync_with ::Country
  sync_column "Name", to: :name
  sync_column "Currency", to: :currency
  sync_column "Dial In Number", to: :dial_in_number
end
