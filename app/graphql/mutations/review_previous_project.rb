# frozen_string_literal: true

module Mutations
  class ReviewPreviousProject < Mutations::BaseMutation
    description "Creates a review for a previous project"
    argument :adherence_to_schedule, Integer, required: false
    argument :availability, Integer, required: false
    argument :comment, String, required: false
    argument :communication, Integer, required: false
    argument :previous_project, ID, required: true
    argument :quality_of_work, Integer, required: false
    argument :skills, Integer, required: false # rubocop:disable GraphQL/ExtractInputType

    field :review, Types::Review, null: true

    def authorized?(**args)
      return false unless context[:oauth_viewer]

      project = PreviousProject.find_by_uid!(args[:previous_project])
      context[:oauth_viewer].can_validate_project?(project)
    end

    def resolve(**args)
      project = PreviousProject.find_by_uid!(args[:previous_project])
      review =
        project.reviews.create(
          comment: args[:comment],
          specialist: project.specialist,
          type: 'Off-Platform Project Review',
          ratings: {
            skills: args[:skills],
            availability: args[:availability],
            communication: args[:communication],
            quality_of_work: args[:quality_of_work],
            adherence_to_schedule: args[:adherence_to_schedule]
          }
        )
      {review: review}
    end
  end
end
