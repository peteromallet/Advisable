# frozen_string_literal: true

dwight = Account.create(email: "dwight@advisable.com", password: "testing123", first_name: "Dwight", last_name: "Schrute")
Specialist.create(account: dwight, guild: true)
jim = Account.create(email: "jim@advisable.com", password: "testing123", first_name: "Jim", last_name: "Halpert")
Specialist.create(account: jim, guild: true)

client = Twilio::REST::Client.new(ENV.fetch('TWILIO_SID'), ENV.fetch('TWILIO_AUTH_TOKEN'))
sid = Digest::MD5.hexdigest([dwight.specialist.uid, jim.specialist.uid].sort.join)
channel = client.chat.services(ENV.fetch("TWILIO_CHAT_SERVICE_SID")).channels.create(
  type: "private",
  unique_name: sid,
  friendly_name: "Test",
  attributes: {
    subject: "Test",
    members: {
      sender_uid: dwight.specialist.uid,
      recipient_uid: jim.specialist.uid
    }
  }.to_json
)
channel.members.create(identity: dwight.specialist.uid)
channel.members.create(identity: jim.specialist.uid)
nil
