class Users::CreateToken < ApplicationService
  attr_reader :user

  def initialize(user: )
    @user = user
  end

  def call
    JWT.encode token_payload, ENV["JWT_SECRET"], 'HS256'
  end

  def token_payload
    {
      sub: user.uid,
      exp: (Time.now + 30.days).to_i
    }
  end
end