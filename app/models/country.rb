class Country < ApplicationRecord
  include UID
  has_many :specialists
  validates_presence_of :name
  validates_presence_of :currency
  validates_presence_of :airtable_id
end
