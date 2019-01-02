class Users::Login < ApplicationService
  attr_reader :user, :password
  
  def initialize(email:, password:)
    @user = User.find_by_email(email.downcase)
    @password = password
  end

  def call
    begin
      return token if valid_credentials?
      raise Service::Error.new("authentication.failed")

    rescue JWT::ExpiredSignature
      raise Service::Error.new("authentication.failed")
    end
  end

  private

  def valid_credentials?
    user && user.password_digest? && user.authenticate(password)
  end

  def token
    Users::CreateToken.call(user: user)
  end
end