class Client < ApplicationRecord
  include Airtable::Syncable
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications
end
