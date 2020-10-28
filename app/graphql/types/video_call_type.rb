class Types::VideoCallType < Types::BaseType
  field :id, ID, null: false
  field :fallback, Boolean, null: true

  field :zoom_meeting_id, String, null: true do
    authorize :is_participant
  end

  field :zoom_passcode, String, null: true do
    authorize :is_participant
  end

  field :zoom_url, String, null: true do
    authorize :is_participant
  end

  field :access_token, String, null: true do
    authorize :is_participant
  end

  field :participant, Types::ViewerUnion, null: false do
    argument :id, ID, required: true
    authorize :is_participant
  end

  def participant(id:)
    SpecialistOrUser.find_by_uid!(id)
  end

  def id
    object.uid
  end

  def access_token
    grant = Twilio::JWT::AccessToken::VideoGrant.new
    grant.room = object.uid

    token = Twilio::JWT::AccessToken.new(
      ENV["TWILIO_SID"],
      ENV["TWILIO_API_KEY_SID"],
      ENV["TWILIO_API_KEY_SECRET"],
      [grant],
      identity: current_user.uid
    )

    token.to_jwt
  end
end
