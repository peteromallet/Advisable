# It's important to note that this model does not inherit from Airtable::Base
# and so does not having syncing functionality. It exist purely as a way to
# query the Airtable Salespeople table.
class Airtable::SalesPeople < Airrecord::Table
  self.table_name = "Salespeople"
  self.base_key = ENV["AIRTABLE_DATABASE_KEY"]
end
