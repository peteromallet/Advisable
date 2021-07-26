# frozen_string_literal: true

class AccountMailerPreview < ActionMailer::Preview
  def zappier_email
    AccountMailer.zappier_email(random_account, "test", "<h1>test</h1><p>ha!</p>")
  end

  def notify_of_new_messages
    AccountMailer.notify_of_new_messages(random_account, Message.where.not(author: random_account).pluck(:id))
  end

  private

  def random_account
    @random_account ||= Account.order("RANDOM()").first
  end
end
