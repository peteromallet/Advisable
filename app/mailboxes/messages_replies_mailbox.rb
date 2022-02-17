# frozen_string_literal: true

class MessagesRepliesMailbox < ApplicationMailbox
  def process
    uid = mail.to.first[/(.*)@/, 1] # https://rubular.com/r/8PIP36d5h6D785
    conversation = Conversation.find_by!(uid:)

    author = find_author(conversation)
    if author
      content = EmailReplyParser.parse_reply(mail_body(mail))
      conversation.new_message!(author: author.account, content:)
    else
      Sentry.capture_message(
        "#{mail.from.first} tried to reply to a conversation that they don't participate in.",
        extra: {conversation:, mail:}
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
