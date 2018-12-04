class Users::Signup < ApplicationService
  attr_reader :email, :password, :password_confirmation

  def initialize(email:, password:, password_confirmation:)
    @email = email
    @password = password
    @password_confirmation = password_confirmation
  end

  def call
    user.assign_attributes(
      password: password,
      password_confirmation: password_confirmation
    )

    if user.save
      user
    else
      raise Service::Error.new(user.errors.full_messages.first)
    end
  end

  private

  def user
    @user ||= User.find_or_initialize_by(email: email.downcase, password_digest: nil)
  end
end