class GuildChatRepliesMailbox < ApplicationMailbox
  def process
    body_text = mail.text_part.body.raw_source
    reply = EmailReplyParser.parse_reply(body_text)

    encoded_regexp = /(?<encoded>.*)@#{ENV.fetch('GUILD_REPLIES_DOMAIN')}/

    @encoded = mail.to.first.match(encoded_regexp)
    unless @encoded
      # Fall back to the References header
      field = mail.header.fields.find { |f| f.name =~ /References/ }
      @encoded = field.unparsed_value.match(/^<#{encoded_regexp}/)
    end

    if (chat_metadata = @encoded.try(:[], :encoded))

      # The previous recipient is now the sender after replying to an email
      sender_uid, recipient_uid, channel = chat_metadata.unpack1('m0').split(':')
      ChatDirectMessageJob.perform_later(
        message: reply,
        sender_uid: sender_uid,
        recipient_uid: recipient_uid
      )
    end
  rescue StandardError => e
    Rails.logger.error("Error with Guild chat reply mailbox #{e.message}")
  end
end
