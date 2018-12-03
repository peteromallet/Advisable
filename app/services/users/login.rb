class Users::Login < ApplicationService
  attr_reader :user, :password
  
  def initialize(email:, password:)
    @user = User.find_by_email(email)
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
    @token ||= JWT.encode token_payload, ENV["JWT_SECRET"], 'HS256'
  end

  def token_payload
    {
      sub: user.uid,
      exp: (Time.now + 30.days).to_i
    }
  end
end