class Guild::ChatMailer < ApplicationMailer
  layout 'styled_mailer'

  def new_message(recipient_uid:, sender_uid:, channel_sid:, message_body:)
    @recipient = Specialist.find_by_uid(recipient_uid)
    @sender = Specialist.find_by_uid(sender_uid)
    @message = message_body
    @conversation_link = "#{ApplicationMailer.default_url_options[:host]}/guild/messages/#{channel_sid}"

    # TODO: possible token for inline reply
    mail(
      to: @recipient.email,
      subject: "New Guild Message from: #{@sender.name}"
    )
  end
end