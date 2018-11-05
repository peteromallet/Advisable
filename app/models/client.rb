class Client < ApplicationRecord
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications
  has_many :client_users
  has_many :users, through: :client_users

  validates :name, presence: true
  attribute :availability, :datetime, default: [], array: true
end
