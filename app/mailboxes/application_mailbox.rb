# frozen_string_literal: true

class ApplicationMailbox < ActionMailbox::Base
  routing /@#{ENV["GUILD_REPLIES_DOMAIN"]}/ => :guild_chat_replies
  routing /@#{ENV["MESSAGE_REPLIES_DOMAIN"]}/ => :messages_replies

  private

  def mail_body(mail)
    if mail.parts.present?
      mail.parts.first.decoded
    else
      mail.decoded
    end
  end
end
