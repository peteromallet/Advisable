# frozen_string_literal: true

module Mutations
  class DeletePreviousProjectImage < Mutations::BaseMutation
    argument :previous_project_image, ID, required: true

    field :image, Types::PreviousProjectImage, null: true

    def authorized?(previous_project_image:, **_args)
      requires_specialist!
      image = PreviousProjectImage.find_by_uid!(previous_project_image)
      policy = PreviousProjectImagePolicy.new(current_user, image)
      policy.delete?
    end

    def resolve(**args)
      image = PreviousProjectImage.find_by_uid!(args[:previous_project_image])
      image.destroy
      {image: image}
    end
  end
end
