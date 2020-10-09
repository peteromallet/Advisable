class GuildChatRepliesMailbox < ApplicationMailbox
  def process
    body_text = mail.text_part.body.raw_source
    reply = EmailReplyParser.parse_reply(text)

    encoded_regexp = /(?<encoded>.*)@guild-replies.advisable/
    @encoded = mail.to.first.match(encoded_regexp)
    unless @encoded
      # Fall back to the References header
      field = mail.header.fields.find { |f| f.name =~ /References/ }
      @encoded = field.unparsed_value.match(/^<#{encoded_regexp}/)
    end

    if (chat_metadata = @encoded.try(:[], :encoded))
      recipient_uid, sender_uid, channel = chat_metadata.unpack1('m0').split(':')
      ChatDirectMessageJob.perform_later(
        message: reply,
        sender_uid: sender_uid,
        recipient_uid: recipient_uid
      )
    end
  end
end
