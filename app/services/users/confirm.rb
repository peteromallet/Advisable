class Users::Confirm < ApplicationService
  attr_reader :user

  def initialize(token:)
    @user = User.find_by_confirmation_token!(token)
  rescue ActiveRecord::RecordNotFound
    raise Service::Error.new("Invalid confirmation token")
  end

  def call
    if user.confirmed
      raise Service::Error.new("Already confirmed")
    end

    user.confirmed_at = DateTime.now
    user.confirmation_token = nil
    user.save(validate: false)
    user
  end
end