class Client < ApplicationRecord
  include Airtable::Syncable
  has_many :projects
  has_many :applications, through: :projects
  has_many :client_users
  has_many :users, through: :client_users
  has_many :interviews, through: :applications
end
