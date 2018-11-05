class User < ApplicationRecord
  # Users have access to client data through the client_users table
  has_many :client_users
  has_many :clients, through: :client_users
  # Currently a user can only have a single client. The model is setup to
  # allow multiple, but for now we just use the first relationship.
  has_one :primary_client_user, -> { order created_at: :asc }, class_name: "ClientUser", foreign_key: "user_id"
  has_one :client, through: :primary_client_user
  has_many :interviews

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true

  private

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    return if availability.nil?
    self.availability = availability.select do |time|
      time > DateTime.now.utc
    end
  end
end
