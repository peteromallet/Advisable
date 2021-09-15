# frozen_string_literal: true

module Types
  class ReviewRatingsInput < Types::BaseInputType
    description "Attributes for Review ratings"

    argument :adherence_to_schedule, Integer, required: false
    argument :availability, Integer, required: false
    argument :communication, Integer, required: false
    argument :quality_of_work, Integer, required: false
    argument :skills, Integer, required: false
  end
end
