# frozen_string_literal: true

class MessagesRepliesMailbox < ApplicationMailbox
  def process
    uid = mail.to.first[/(.*)@/, 1] # https://rubular.com/r/8PIP36d5h6D785
    conversation = Conversation.find_by!(uid: uid)

    author = find_author(conversation)
    if author
      content = EmailReplyParser.parse_reply(mail_body(mail))
      message = conversation.messages.create!(content: content, author: author.account)
      message.after_create_actions
    else
      Sentry.capture_message(
        "#{mail.from.first} tried to reply to a conversation that they don't participate in.",
        extra: {conversation: conversation, mail: mail}
      )
    end
  end

  private

  def find_author(conversation)
    participants = conversation.participants.includes(:account)
    participants.find { |cp| cp.account.email == mail.from.first } ||
      participants.find { |cp| cp.account.email.sub(/\+.*@/, "@") == mail.from.first.sub(/\+.*@/, "@") }
  end
end
