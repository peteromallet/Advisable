class Client < ApplicationRecord
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications
  has_many :client_users
  has_many :users, through: :client_users
  # The priamry user of a client is the first user. In theory this is the person
  # that owns the client record. This should be relaced with proper permission
  # based roles when proper team accounts are introduced.
  has_one :primary_client_user, -> { order created_at: :asc }, class_name: "ClientUser", foreign_key: "user_id"
  has_one :primary_user, through: :primary_client_user, source: :user

  validates :name, presence: true
end
