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
      image.record.update(cover_photo_id: nil) if image.record.cover_photo_id == id.to_i
      image.destroy
      {success: true}
    end
  end
end
