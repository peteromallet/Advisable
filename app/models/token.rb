# frozen_string_literal: true

class Token
  # Returns a random token.
  def self.new
    SecureRandom.urlsafe_base64
  end

  # Returns the hash digest of the given string.
  def self.digest(string)
    cost = if ActiveModel::SecurePassword.min_cost
             BCrypt::Engine::MIN_COST
           else
             BCrypt::Engine.cost
           end
    BCrypt::Password.create(string, cost:)
  end
end
