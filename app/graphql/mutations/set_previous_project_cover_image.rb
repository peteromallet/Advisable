# frozen_string_literal: true

module Mutations
  class SetPreviousProjectCoverImage < Mutations::BaseMutation
    argument :attachment, String, required: true
    argument :previous_project, ID, required: true

    field :image, Types::PreviousProjectImage, null: true

    def authorized?(previous_project:, **_args)
      requires_specialist!
      project = PreviousProject.find_by!(previous_project)
      policy = PreviousProjectPolicy.new(current_user, project)
      policy.create_image?
    end

    def resolve(previous_project:, attachment:)
      project = PreviousProject.find_by!(previous_project)
      image = project.cover_photo.attach(attachment)

      {image: image}
    end
  end
end
