# frozen_string_literal: true

module Mutations
  class DeletePreviousProjectImage < Mutations::BaseMutation
    argument :id, ID, required: true

    field :success, Boolean, null: true

    def authorized?(id:)
      requires_specialist!
      image = ActiveStorage::Attachment.find(id)
      policy = PreviousProjectPolicy.new(current_user, image.record)
      policy.delete_image?
    end

    def resolve(id:)
      image = ActiveStorage::Attachment.find(id)
      image.destroy
      {success: true}
    end
  end
end
