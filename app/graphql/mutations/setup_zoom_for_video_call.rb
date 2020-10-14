# Used to update an application record during the application process.
class Mutations::SetupZoomForVideoCall < Mutations::BaseMutation
  argument :id, ID, required: true

  field :video_call, Types::VideoCallType, null: true

  def authorize(id:)
    requires_current_user!
  end

  def resolve(id:)
    video_call = VideoCall.find_by_uid!(id)
    video_call.fallback = true
    video_call.save

    {video_call: video_call}
  end
end
