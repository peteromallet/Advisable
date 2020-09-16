class VideoCallPolicy < BasePolicy
  # At the moment we don't have the idea of an explicit participant for a call
  # instead we just want to ensure a user is authenticated
  def is_participant
    user.present?
  end
end
