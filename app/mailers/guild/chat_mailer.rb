class Guild::ChatMailer < ApplicationMailer
  layout 'styled_mailer'

  def new_message(recipient_uid:, sender_uid:, channel_sid:, message_body:)
    @recipient = Specialist.find_by(uid: recipient_uid)
    @sender = Specialist.find_by(uid: sender_uid)
    @message = message_body
    @conversation_link = "#{ApplicationMailer.default_url_options[:host]}/guild/messages/#{channel_sid}"

    # Encodes chat metadata
    chat_info = [recipient_uid, sender_uid, channel_sid].join(':')
    message_id = Base64.strict_encode64(chat_info)
    reply_to = "#{message_id}@#{ENV.fetch('GUILD_REPLIES_DOMAIN')}"

    # Set as a header in case the <encoded>@guild exceeds the RFC length
    # This will be accessed under the "References" header.
    headers['Message-ID'] = "<#{reply_to}>"

    mail(
      to: @recipient.email,
      subject: "New Guild Message from: #{@sender.name}",
      reply_to: reply_to
    )
  end
end
