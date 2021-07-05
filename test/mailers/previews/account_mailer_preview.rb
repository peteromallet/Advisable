# frozen_string_literal: true

class AccountMailerPreview < ActionMailer::Preview
  def zappier_email
    AccountMailer.zappier_email(random_account, "test", "<h1>test</h1><p>ha!</p>")
  end

  private

  def random_account
    Account.order("RANDOM()").first
  end
end
