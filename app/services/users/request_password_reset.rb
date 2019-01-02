class Users::RequestPasswordReset < ApplicationService
  attr_reader :user

  def initialize(user:)
    @user = user
  end

  def call
    user.update_attributes({
      reset_digest: Token.digest(token),
      reset_sent_at: Time.zone.now
    })
    UserMailer.reset_password(id: user.id, token: token).deliver_later
  end

  private

  def token
    @token ||= Token.new
  end
end