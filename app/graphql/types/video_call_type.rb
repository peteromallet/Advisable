# frozen_string_literal: true

module Types
  class VideoCallType < Types::BaseType
    field :id, ID, null: false, method: :uid
    field :fallback, Boolean, null: true

    field :zoom_meeting_id, String, null: true do
      authorize :participant?
    end

    field :zoom_passcode, String, null: true do
      authorize :participant?
    end

    field :zoom_url, String, null: true do
      authorize :participant?
    end

    field :access_token, String, null: true do
      authorize :participant?
    end

    def access_token
      grant = Twilio::JWT::AccessToken::VideoGrant.new
      grant.room = object.uid

      token = Twilio::JWT::AccessToken.new(
        ENV.fetch("TWILIO_SID", nil),
        ENV.fetch("TWILIO_API_KEY_SID", nil),
        ENV.fetch("TWILIO_API_KEY_SECRET", nil),
        [grant],
        identity: current_user.uid
      )

      token.to_jwt
    end

    field :participant, Types::ViewerUnion, null: false do
      argument :id, ID, required: true
      authorize :participant?
    end

    def participant(id:)
      SpecialistOrUser.find_by_uid!(id)
    end
  end
end
