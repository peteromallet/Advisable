# Set the cover photo for a specialist
class Mutations::SetCoverPhoto < Mutations::BaseMutation
  argument :blob, String, required: true

  field :specialist, Types::SpecialistType, null: true

  def authorized?(*)
    ApiError.not_authenticated if current_user.nil?

    unless current_user.is_a?(Specialist)
      ApiError.invalid_request(
        code: 'MUST_BE_SPECIALIST',
        message: 'Must be logged in as a speicalist'
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
