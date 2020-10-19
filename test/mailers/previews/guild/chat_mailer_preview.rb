class Guild::ChatMailerPreview < ActionMailer::Preview
  # http://localhost:5000/rails/mailers/guild/chat_mailer/new_message
  def new_message
    Guild::ChatMailer.new_message(
      recipient_uid: Specialist.first.uid,
      sender_uid: Specialist.last.uid,
      channel_sid: "channel-123",
      message_body: Faker::Quote.yoda[0..120]
    )
  end
end
