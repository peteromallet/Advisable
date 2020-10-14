class Types::VideoCallType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: true
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

  def id
    object.uid
  end

  def name
    return if object.interview.nil?
    specialist = object.interview.application.specialist.name
    user = object.interview.user.name
    "#{specialist} & #{user}"
  end

  def access_token
    grant = Twilio::JWT::AccessToken::VideoGrant.new
    grant.room = object.id

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
