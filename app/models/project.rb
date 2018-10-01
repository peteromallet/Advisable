class Project < ApplicationRecord
  has_many :applications
  belongs_to :client
  validates :name, presence: true
  validates :airtable_id, presence: true
end
