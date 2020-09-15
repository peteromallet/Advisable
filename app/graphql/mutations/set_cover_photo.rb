# Set the cover photo for a specialist
class Mutations::SetCoverPhoto < Mutations::BaseMutation
  argument :blob, String, required: true

  field :specialist, Types::SpecialistType, null: true

  def authorized?(*)
    requires_current_user!

    unless current_user.respond_to?(:cover_photo)
      ApiError.invalid_request(
        code: 'MUST_HAVE_COVER_PHOTO',
        message: 'Current user must have a cover photo'
      )
    end

    true
  end

  def resolve(blob:)
    current_user.cover_photo.attach(blob)
    {specialist: current_user}
  rescue ActiveSupport::MessageVerifier::InvalidSignature
    ApiError.invalid_request(code: 'INVALID_BLOB', message: 'Invalid blob')
  end
end
