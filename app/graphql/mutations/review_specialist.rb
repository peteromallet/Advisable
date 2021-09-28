# frozen_string_literal: true

module Mutations
  class ReviewSpecialist < Mutations::BaseMutation
    description "Creates a review for a Specialist"

    argument :comment, String, required: false
    argument :company_name, String, required: false
    argument :ratings, Types::ReviewRatingsInput, required: true
    argument :relationship, String, required: false
    argument :specialist, ID, required: true

    field :review, Types::Review, null: false

    def authorized?(**_args)
      requires_oauth_viewer!
    end

    def resolve(**args)
      specialist = Specialist.find_by!(uid: args[:specialist])
      review = specialist.reviews.create(
        first_name: oauth_viewer.first_name,
        last_name: oauth_viewer.last_name,
        comment: args[:comment],
        company_name: args[:company_name],
        relationship: args[:relationship],
        ratings: {
          skills: args.dig(:ratings, :skills),
          availability: args.dig(:ratings, :availability),
          communication: args.dig(:ratings, :communication),
          quality_of_work: args.dig(:ratings, :quality_of_work),
          adherence_to_schedule: args.dig(:ratings, :adherence_to_schedule)
        }
      )
      {review: review}
    end
  end
end
