class Specialists::UpdateProfile < ApplicationService
  attr_accessor :specialist, :attributes

  def initialize(specialist:, attributes:)
    @specialist = specialist
    @attributes = attributes
  end

  def call
    specialist.assign_attributes(attributes)

    if specialist.save
      specialist.sync_to_airtable
      specialist
    else
      raise Service::Error.new(specialist.errors.full_messages.first)
    end
  end
end