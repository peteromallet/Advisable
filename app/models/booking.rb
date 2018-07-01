class Booking < ApplicationRecord
  # disable STI
  self.inheritance_column = :_type_disabled

  belongs_to :application
  after_initialize :set_status, if: :new_record?

  serialize :deliverables, Array

  private

  def set_status
    self.status = "Offered"
  end
end
