# frozen_string_literal: true

class ApplicationMailbox < ActionMailbox::Base
  routing /@#{ENV["GUILD_REPLIES_DOMAIN"]}/ => :guild_chat_replies
  routing /@#{ENV["MESSAGE_REPLIES_DOMAIN"]}/ => :messages_replies

  private

  def mail_body(mail)
    if mail.parts.present?
      part_to_use = mail.text_part || mail.html_part || mail
      encoding = part_to_use.content_type_parameters["charset"] if part_to_use.content_type_parameters
      body = part_to_use.body.decoded
      body.force_encoding(encoding).encode("UTF-8") if encoding
    else
      mail.decoded
    end
  end
end
