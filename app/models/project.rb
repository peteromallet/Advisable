class Project < ApplicationRecord
  has_many :applications
  validates :name, presence: true
  validates :airtable_id, presence: true
end
