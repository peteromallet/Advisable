class Types::VideoCallType < Types::BaseType
  field :id, ID, null: false
  field :name, String, null: true
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
    token = Twilio::JWT::AccessToken.new(
      ENV["TWILLIO_SID"],
      ENV["TWILLIO_API_KEY_SID"],
      ENV["TWILLIO_API_KEY_SECRET"],
      [],
      identity: current_user.first_name
    )

    grant = Twilio::JWT::AccessToken::VideoGrant.new
    grant.room = object.id
    token.add_grant(grant)
    token.to_jwt
  end
end
