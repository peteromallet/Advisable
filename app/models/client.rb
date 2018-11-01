class Client < ApplicationRecord
  has_many :projects
  has_many :applications, through: :projects
  has_many :interviews, through: :applications
  validates :name, presence: true
  attribute :availability, :datetime, default: [], array: true

  before_save :remove_past_availabililty

  private

  # Called before the client record is saved to clean up any availability
  # in the past.
  def remove_past_availabililty
    self.availability = availability.select do |time|
      time > DateTime.now.utc
    end
  end
end
