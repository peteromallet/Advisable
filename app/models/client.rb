class Client < ApplicationRecord
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications
  has_many :client_users
  has_many :users, through: :client_users

  validates :name, presence: true

  # The priamry user of a client is the first user. In theory this is the person
  # that owns the client record. This should be relaced with proper permission
  # based roles when proper team accounts are introduced.
  def primary_user
    users.order(created_at: :asc).first
  end
end
