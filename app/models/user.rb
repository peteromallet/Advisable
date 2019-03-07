class User < ApplicationRecord
  include UID
  include Account
  include Airtable::Syncable
  airtable_class Airtable::ClientContact

  has_many :projects
  has_many :interviews
  belongs_to :country, required: false

  before_save :remove_past_availabililty

  attribute :availability, :datetime, default: [], array: true

  def name
    "#{first_name} #{last_name}"
  end

  def setup_required
    !airtable_id
  end

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
