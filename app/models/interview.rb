class Interview < ApplicationRecord
  belongs_to :application
  belongs_to :user # An interview is schduled with a specific user (client contact)
  validate :starts_at_available?, unless: -> { status == 'Call Requested' }

  scope :scheduled, -> { where(status: "Call Scheduled" )}

  private

  def starts_at_available?
    return if !starts_at || !user
    return if user.availability.include?(starts_at)
    errors.add(:starts_at, "#{starts_at} is not available")
  end
end
