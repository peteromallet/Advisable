class Booking < ApplicationRecord
  validates :airtable_id, presence: true
  validates :status, inclusion: { in: %w(offered accepted declined complete) }

  # disable STI
  self.inheritance_column = :_type_disabled

  belongs_to :application
  after_initialize :set_status, if: :new_record?

  serialize :deliverables, Array

  # When setting the booking status. Convert it to lowercase underscore
  def status=(status)
    self[:status] = status.parameterize.underscore
  end

  private

  def set_status
    self.status = "Offered"
  end
end
