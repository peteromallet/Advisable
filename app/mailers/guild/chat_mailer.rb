class Guild::ChatMailer < ApplicationMailer
  layout 'styled_mailer'

  def new_message(recipient_uid:, sender_uid:, channel_sid:, message_body:)
    @recipient = Specialist.find_by(uid: recipient_uid)
    @sender = Specialist.find_by(uid: sender_uid)
    @message = message_body
    @conversation_link = "#{ApplicationMailer.default_url_options[:host]}/guild/messages/#{channel_sid}"

    # Encodes chat metadata and sets as Message ID header
    # When the user replies this will be within the 'References' Header w/ the SendGrid webhook
    chat_info = [recipient_uid, sender_uid, channel_sid].join(':')
    message_id = Base64.strict_encode64(chat_info)
    headers['Message-ID'] = "<#{message_id}@guild.advisable.com>"

    mail(
      to: @recipient.email,
      subject: "New Guild Message from: #{@sender.name}",
      reply_to: "reply@guild.advisable.com"
    )
  end
end