class Interview < ApplicationRecord
  belongs_to :application
  attribute :availability, :datetime, default: [], array: true
  validate :starts_at_available?

  private

  def starts_at_available?
    return if availability.include?(starts_at)
    errors.add(:starts_at, "#{starts_at} is not available")
  end
end
