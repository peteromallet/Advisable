# frozen_string_literal: true

class MessagesRepliesMailbox < ApplicationMailbox
  def process
    uid = mail.to.first[/(.*)@/, 1] # https://rubular.com/r/8PIP36d5h6D785
    conversation = Conversation.find_by!(uid: uid)
    author = Account.find_by(email: mail.from.first)
    content = EmailReplyParser.parse_reply(mail_body(mail))
    message = conversation.messages.create!(content: content, author: author)
    message.after_create_actions
  end
end
