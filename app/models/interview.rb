class Interview < ApplicationRecord
  belongs_to :application
  validate :starts_at_available?, unless: -> { status == 'Call Requested' }

  private

  def starts_at_available?
    return if !starts_at || application.project.client.availability.include?(starts_at)
    errors.add(:starts_at, "#{starts_at} is not available")
  end
end
